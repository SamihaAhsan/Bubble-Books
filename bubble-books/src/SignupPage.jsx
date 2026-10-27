import { useState } from 'react'
import './SignupPage.css'

function SignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSignup(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)
      const tokenInfo = await handleCSRFToken()
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': tokenInfo.token,
        },
        body: JSON.stringify({
          firstName: formData.get('firstName'),
          lastName: formData.get('lastName'),
          username: formData.get('username'),
          email: formData.get('email'),
          password: formData.get('password'),
          city: formData.get('location'),
          country: 'Canada',
        }),
      })

      if (!response.ok) {
        throw new Error(`We couldn’t create your account (error ${response.status}). Please try again.`)
      }

      window.location.href = '/signup/preferences'
    } catch (requestError) {
      setError(requestError.message || 'We couldn’t create your account. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="signup-page">
      <header className="signup-header">
        <a className="brand" href="/" aria-label="Bubble Books home">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
          </span>
          <span>Bubble Books</span>
        </a>
        <a className="signup-back-link" href="/">Back to home</a>
      </header>

      <section className="signup-content" aria-labelledby="signup-title">
        <div className="auth-layout">
          <div className="auth-form-content">
            <span className="eyebrow">Your next chapter starts here</span>
            <h1 id="signup-title">Join the bookish bunch</h1>
            <p className="signup-intro">
              Create your Bubble Books profile and get ready to pass the magic on.
            </p>

            <form className="signup-form" onSubmit={handleSignup}>
              <div className="signup-fields">
                <label className="signup-field">
                  <span>First name</span>
                  <input
                    type="text"
                    name="firstName"
                    autoComplete="given-name"
                    placeholder="e.g. Jamie"
                    required
                  />
                </label>

                <label className="signup-field">
                  <span>Last name</span>
                  <input
                    type="text"
                    name="lastName"
                    autoComplete="family-name"
                    placeholder="e.g. Taylor"
                    required
                  />
                </label>

                <label className="signup-field">
                  <span>Username</span>
                  <input
                    type="text"
                    name="username"
                    autoComplete="username"
                    placeholder="Pick a reader name"
                    required
                  />
                </label>

                <label className="signup-field">
                  <span>Email address</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                  />
                </label>

                <label className="signup-field">
                  <span>Password</span>
                  <input
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    placeholder="Create a password"
                    required
                  />
                </label>

                <label className="signup-field">
                  <span>Location</span>
                  <input
                    type="text"
                    name="location"
                    autoComplete="address-level2"
                    placeholder="City or town"
                    required
                  />
                </label>
              </div>

              {error && <p className="signup-error" role="alert">{error}</p>}
              <button className="button button-primary signup-next" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating your account…' : 'Create account'}
                {!isSubmitting && <span aria-hidden="true">→</span>}
              </button>
              <p className="signup-note">Just the beginning of a lovely little adventure.</p>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

async function handleCSRFToken() {
  const response = await fetch(
    "http://localhost:8080/csrf",
    {
      method: "GET",
      credentials: "include"
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch CSRF token");
  }

  const data = await response.json();

  return data;
}

export default SignupPage
