import { NextResponse } from 'next/server'

import { hasTrustedFormOrigin } from '@/src/lib/trusted-form-origin'

const firstUserPath = '/admin/create-first-user'

function redirectWithError(request: Request, error: string) {
  const url = new URL(firstUserPath, request.url)
  url.searchParams.set('error', error)
  return NextResponse.redirect(url, 303)
}

export async function POST(request: Request) {
  if (!hasTrustedFormOrigin(request)) {
    return new NextResponse('Forbidden', {
      headers: { 'cache-control': 'no-store' },
      status: 403,
    })
  }

  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')
  const confirmPassword = formData.get('confirmPassword')

  if (
    typeof email !== 'string' ||
    !email.includes('@') ||
    typeof password !== 'string' ||
    password.length < 8
  ) {
    return redirectWithError(request, 'invalid')
  }

  if (password !== confirmPassword) {
    return redirectWithError(request, 'mismatch')
  }

  const registrationResponse = await fetch(
    new URL('/api/users/first-register', request.url),
    {
      body: JSON.stringify({ email, password }),
      headers: { 'content-type': 'application/json' },
      method: 'POST',
    },
  )

  if (!registrationResponse.ok) {
    return redirectWithError(request, 'unavailable')
  }

  const response = NextResponse.redirect(new URL('/admin', request.url), 303)
  const setCookie = registrationResponse.headers.get('set-cookie')

  if (setCookie) {
    response.headers.set('set-cookie', setCookie)
  }

  return response
}
