import './SignupPage.css'
import './LoginPage.css'

function LoginPage() {
  
  async function handleLogin(event) {
  event.preventDefault();

  try {
    const formData = new FormData(event.currentTarget);
    const csrfData = await handleCSRFToken();

    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        [csrfData.headerName]: csrfData.token
      },
      credentials: "include",
      body: new URLSearchParams({
        username: formData.get("username"),
        password: formData.get("password")
      })
    });

    if (response.ok) {
      window.location.href = "/home";
    } else if (response.status === 401) {
      alert("Incorrect username or password.");
    } else {
      alert(`Login failed. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong. Check the console.");
  }
}
  
  return (
    <main className="signup-page login-page">
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

      <section className="signup-content" aria-labelledby="login-title">
        <div className="auth-layout login-layout">
          <div className="auth-form-content login-form-content">
            <span className="eyebrow">Welcome back, book lover</span>
            <h1 id="login-title">Let&apos;s pick up where you left off</h1>
            <p className="signup-intro">
              Sign in to find your next lovely read.
            </p>

            <form className="signup-form" onSubmit={handleLogin}>
              <div className="signup-fields login-fields">
                <label className="signup-field">
                  <span>Username</span>
                  <input
                    type="text"
                    name="username"
                    autoComplete="username"
                    placeholder="Your username"
                    required
                  />
                </label>

                <label className="signup-field">
                  <span>Password</span>
                  <input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Your password"
                    required
                  />
                </label>
              </div>

              <button className="button button-primary signup-next" type="submit">
                Log in <span aria-hidden="true">→</span>
              </button>
              <p className="signup-note">
                New to Bubble Books? <a href="/signup">Join the bookish bunch</a>
              </p>
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

export default LoginPage
