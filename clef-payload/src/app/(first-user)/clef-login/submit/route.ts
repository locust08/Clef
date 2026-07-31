import { NextResponse } from 'next/server'

import { hasTrustedFormOrigin } from '@/src/lib/trusted-form-origin'

const loginPath = '/clef-login'

function safeAdminRedirect(value: string | null) {
  return value?.startsWith('/admin') && !value.startsWith('//') ? value : '/admin'
}

function redirectToLogin(request: Request, redirect: string) {
  const url = new URL(loginPath, request.url)
  url.searchParams.set('error', 'invalid')

  if (redirect !== '/admin') {
    url.searchParams.set('redirect', redirect)
  }

  return NextResponse.redirect(url, 303)
}

export async function POST(request: Request) {
  if (!hasTrustedFormOrigin(request)) {
    return new NextResponse('Forbidden', {
      headers: { 'cache-control': 'no-store' },
      status: 403,
    })
  }

  const redirect = safeAdminRedirect(new URL(request.url).searchParams.get('redirect'))
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')

  if (typeof email !== 'string' || !email.includes('@') || typeof password !== 'string') {
    return redirectToLogin(request, redirect)
  }

  const loginResponse = await fetch(new URL('/api/users/login', request.url), {
    body: JSON.stringify({ email, password }),
    headers: { 'content-type': 'application/json' },
    method: 'POST',
  })

  if (!loginResponse.ok) {
    return redirectToLogin(request, redirect)
  }

  const response = NextResponse.redirect(new URL(redirect, request.url), 303)
  const setCookie = loginResponse.headers.get('set-cookie')

  if (setCookie) {
    response.headers.set('set-cookie', setCookie)
  }

  return response
}
