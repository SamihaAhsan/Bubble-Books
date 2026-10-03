import './SignupPage.css'

function SignupPage() {
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
        <div className="signup-card">
          <div className="signup-card-art" aria-hidden="true">
            <span className="signup-art-sparkle">✦</span>
            <div className="signup-art-book signup-art-book-one" />
            <div className="signup-art-book signup-art-book-two" />
            <div className="signup-art-flower">✿</div>
          </div>

          <div className="signup-form-content">
            <span className="eyebrow">Your next chapter starts here</span>
            <h1 id="signup-title">Join the bookish bunch</h1>
            <p className="signup-intro">
              Create your Bubble Books profile and get ready to pass the magic on.
            </p>

            <form className="signup-form" onSubmit={(event) => event.preventDefault()}>
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

              <button className="button button-primary signup-next" type="submit">
                Next <span aria-hidden="true">→</span>
              </button>
              <p className="signup-note">Just the beginning of a lovely little adventure.</p>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SignupPage
