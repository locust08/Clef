import { chromium } from 'playwright'

const EXPECTED_ORIGIN = 'https://clef-payload-preview.easondev.workers.dev'

function fail(code, details = {}) {
  const error = new Error(code)
  error.code = code
  error.details = details
  throw error
}

const rawBaseURL =
  process.env.PAYLOAD_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL || ''
const email = process.env.PAYLOAD_ADMIN_EMAIL?.trim().toLowerCase()
const password = process.env.PAYLOAD_ADMIN_PASSWORD

let configuredURL
try {
  configuredURL = new URL(rawBaseURL)
} catch {
  configuredURL = undefined
}

if (
  !configuredURL ||
  configuredURL.origin !== EXPECTED_ORIGIN ||
  configuredURL.href !== `${EXPECTED_ORIGIN}/`
) {
  console.error(JSON.stringify({ error: 'INVALID_PRODUCTION_URL' }))
  process.exit(1)
}

if (!email || !password) {
  console.error(JSON.stringify({ error: 'MISSING_PRODUCTION_TEST_CREDENTIALS' }))
  process.exit(1)
}

const origin = configuredURL.origin
const browser = await chromium.launch({ headless: true })

function classifyLoginStatus(status) {
  if (status === 400 || status === 401) {
    fail('USER_MISSING_OR_INVALID_CREDENTIALS', { loginStatus: status })
  }
  if (status === 403) fail('CORS_OR_CSRF_REJECTED', { loginStatus: status })
  if (status >= 500) fail('WORKER_DB_MIGRATION_OR_RUNTIME_ERROR', { loginStatus: status })
  if (status < 200 || status >= 300) fail('UNEXPECTED_LOGIN_STATUS', { loginStatus: status })
}

async function currentUser(page) {
  return page.evaluate(async () => {
    const response = await fetch('/api/users/me', { credentials: 'include' })
    const body = await response.json()
    return { email: body.user?.email || null, status: response.status }
  })
}

async function verifyDirectAPI() {
  const context = await browser.newContext()
  try {
    const page = await context.newPage()
    await page.goto(`${origin}/clef-login`, { waitUntil: 'domcontentloaded' })

    const responsePromise = page.waitForResponse(
      (response) =>
        response.url() === `${origin}/api/users/login` &&
        response.request().method() === 'POST',
    )
    const browserLogin = page.evaluate(
      async ({ loginEmail, loginPassword }) => {
        const response = await fetch('/api/users/login', {
          body: JSON.stringify({ email: loginEmail, password: loginPassword }),
          credentials: 'include',
          headers: { 'content-type': 'application/json' },
          method: 'POST',
        })
        await response.text()
        return response.status
      },
      { loginEmail: email, loginPassword: password },
    )
    const [loginResponse, loginStatus] = await Promise.all([responsePromise, browserLogin])
    classifyLoginStatus(loginStatus)

    const setCookie = await loginResponse.headerValue('set-cookie')
    if (!setCookie) fail('MISSING_SET_COOKIE', { loginStatus })
    if (/;\s*domain=/i.test(setCookie)) fail('COOKIE_DOMAIN_MUST_BE_HOST_ONLY')

    const cookieName = setCookie.slice(0, setCookie.indexOf('='))
    const authCookie = (await context.cookies(origin)).find(({ name }) => name === cookieName)
    if (!authCookie) fail('COOKIE_REJECTED')
    if (!authCookie.httpOnly) fail('COOKIE_NOT_HTTP_ONLY')
    if (!authCookie.secure) fail('COOKIE_NOT_SECURE')
    if (authCookie.sameSite !== 'Lax') fail('COOKIE_SAMESITE_MISMATCH')

    const user = await currentUser(page)
    if (user.status >= 500) {
      fail('WORKER_DB_MIGRATION_OR_RUNTIME_ERROR', { currentUserStatus: user.status })
    }
    if (user.email?.toLowerCase() !== email) {
      fail('COOKIE_NOT_SENT_OR_SECRET_MISMATCH', { currentUserStatus: user.status })
    }

    await page.evaluate(async () => {
      await fetch('/api/users/logout', { credentials: 'include', method: 'POST' })
    })

    return { cookieName, loginStatus }
  } finally {
    await context.close()
  }
}

async function verifyVisibleLoginFlow() {
  const context = await browser.newContext()
  try {
    const page = await context.newPage()
    await page.goto(`${origin}/clef-login`, { waitUntil: 'domcontentloaded' })

    const loginButton = page.getByRole('button', { name: 'Log in' })
    if (!(await loginButton.isVisible())) fail('LOGIN_PAGE_NOT_RENDERED')

    await page.getByLabel('Email').fill(email)
    await page.getByLabel('Password').fill(password)

    const submitResponsePromise = page.waitForResponse(
      (response) =>
        response.url().startsWith(`${origin}/clef-login/submit`) &&
        response.request().method() === 'POST',
    )
    await loginButton.click()
    const submitResponse = await submitResponsePromise
    const submitStatus = submitResponse.status()

    await page.waitForLoadState('domcontentloaded')
    if (submitStatus === 403) fail('CUSTOM_LOGIN_CSRF_REJECTED', { submitStatus })
    if (submitStatus >= 500) fail('CUSTOM_LOGIN_WORKER_ERROR', { submitStatus })
    if (new URL(page.url()).pathname === '/clef-login') {
      fail('CUSTOM_LOGIN_REJECTED_OR_COOKIE_NOT_FORWARDED', { submitStatus })
    }

    const user = await currentUser(page)
    if (user.email?.toLowerCase() !== email) {
      fail('CUSTOM_LOGIN_COOKIE_NOT_RETAINED', { currentUserStatus: user.status })
    }

    const currentPath = new URL(page.url()).pathname
    if (!currentPath.startsWith('/admin')) fail('ADMIN_DASHBOARD_NOT_REACHED')

    const bodyText = (await page.locator('body').innerText()).trim().toLowerCase()
    if (
      !bodyText ||
      bodyText.includes("this page couldn't load") ||
      bodyText.includes('welcome back')
    ) {
      fail('ADMIN_DASHBOARD_NOT_RENDERED')
    }

    const dashboardUI = page.locator(
      'nav, [class*="dashboard"], a[href^="/admin/collections/"]',
    )
    if ((await dashboardUI.count()) === 0) fail('ADMIN_DASHBOARD_NOT_RENDERED')

    await page.reload({ waitUntil: 'domcontentloaded' })
    const refreshedUser = await currentUser(page)
    if (refreshedUser.email?.toLowerCase() !== email) fail('SESSION_NOT_PERSISTED')

    const logoutStatus = await page.evaluate(async () => {
      const response = await fetch('/api/users/logout', {
        credentials: 'include',
        method: 'POST',
      })
      await response.text()
      return response.status
    })
    if (logoutStatus < 200 || logoutStatus >= 300) {
      fail('LOGOUT_REQUEST_FAILED', { logoutStatus })
    }
    if ((await currentUser(page)).email) fail('LOGOUT_FAILED')

    return { submitStatus }
  } finally {
    await context.close()
  }
}

try {
  const apiResult = await verifyDirectAPI()
  const uiResult = await verifyVisibleLoginFlow()

  console.log(
    JSON.stringify({
      adminDashboard: 'rendered',
      cookie: {
        hostOnly: true,
        httpOnly: true,
        name: apiResult.cookieName,
        sameSite: 'Lax',
        secure: true,
      },
      currentUser: 'authenticated',
      loginStatus: apiResult.loginStatus,
      loginSubmitStatus: uiResult.submitStatus,
      logout: 'verified',
      sessionAfterRefresh: 'authenticated',
    }),
  )
} catch (error) {
  console.error(
    JSON.stringify({
      details: error?.details || {},
      error: error?.code || 'PRODUCTION_AUTH_VERIFICATION_FAILED',
    }),
  )
  process.exitCode = 1
} finally {
  await browser.close()
}
