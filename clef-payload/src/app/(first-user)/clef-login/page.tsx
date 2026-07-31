import type { Metadata } from 'next'

type Props = {
  searchParams: Promise<{ error?: string; redirect?: string }>
}

export const metadata: Metadata = {
  title: 'Login - Payload',
}

export default async function LoginPage({ searchParams }: Props) {
  const { error, redirect } = await searchParams
  const action = new URLSearchParams()

  if (redirect?.startsWith('/admin') && !redirect.startsWith('//')) {
    action.set('redirect', redirect)
  }

  return (
    <main className="first-user-page">
      <section aria-labelledby="login-title" className="first-user-card">
        <p className="first-user-eyebrow">Clef CMS</p>
        <h1 id="login-title">Welcome back</h1>
        <p>Sign in to manage your Payload content.</p>

        {error ? (
          <p className="first-user-error" role="alert">
            The email or password was not accepted. Please try again.
          </p>
        ) : null}

        <form
          action={`/clef-login/submit${action.size ? `?${action}` : ''}`}
          className="first-user-form"
          method="post"
        >
          <label>
            <span>Email</span>
            <input
              autoComplete="email"
              autoFocus
              name="email"
              required
              type="email"
            />
          </label>

          <label>
            <span>Password</span>
            <input autoComplete="current-password" name="password" required type="password" />
          </label>

          <button type="submit">Log in</button>
        </form>
      </section>
    </main>
  )
}
