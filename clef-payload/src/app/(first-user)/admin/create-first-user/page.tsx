import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Create first user - Payload',
}

type Props = {
  searchParams: Promise<{ error?: string }>
}

const errorMessages: Record<string, string> = {
  invalid: 'Enter a valid email address and a password of at least eight characters.',
  mismatch: 'The password confirmation does not match.',
  unavailable:
    'The first user could not be created. A user may already exist, or the service may be temporarily unavailable.',
}

export default async function CreateFirstUserPage({ searchParams }: Props) {
  const { error } = await searchParams

  return (
    <main className="first-user-page">
      <section className="first-user-card" aria-labelledby="first-user-title">
        <h1 id="first-user-title">Welcome</h1>
        <p>To begin, create your first user.</p>

        {error && errorMessages[error] ? (
          <div className="first-user-error" role="alert">
            {errorMessages[error]}
          </div>
        ) : null}

        <form
          action="/admin/create-first-user/register"
          className="first-user-form"
          method="post"
        >
          <label>
            Email
            <input autoComplete="email" name="email" required type="email" />
          </label>

          <label>
            Password
            <input
              autoComplete="new-password"
              minLength={8}
              name="password"
              required
              type="password"
            />
          </label>

          <label>
            Confirm password
            <input
              autoComplete="new-password"
              minLength={8}
              name="confirmPassword"
              required
              type="password"
            />
          </label>

          <button type="submit">Create</button>
        </form>
      </section>
    </main>
  )
}
