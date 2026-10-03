import './App.css'
import SignupPage from './SignupPage.jsx'

function App() {
  if (window.location.pathname === '/signup') {
    return <SignupPage />
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Bubble Books home">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
          </span>
          <span>Bubble Books</span>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#about">About</a>
        </nav>

        <div className="nav-actions">
          <a className="login-link" href="#about">Log in</a>
          <a className="button button-small button-primary" href="/signup">
            Get started
          </a>
        </div>
      </header>

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <h1>Read a book.<br />Pass on the <span>magic.</span></h1>
          <p className="hero-description">
            Helping you find your next favourite read, while your old favourites find a new home.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="/signup">
              Start trading <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="reader-note">
            <div className="reader-dots" aria-hidden="true"><span>♡</span><span>✿</span><span>☼</span></div>
          </div>
        </div>

        <div className="hero-art" role="img" aria-label="A cozy stack of books ready to be shared">
          <div className="art-sun" />
          <span className="sparkle sparkle-one" aria-hidden="true">✦</span>
          <span className="sparkle sparkle-two" aria-hidden="true">✧</span>
          <span className="sparkle sparkle-three" aria-hidden="true">✦</span>
          <div className="book book-back">
            <span className="book-label">THE<br />WILD<br />GARDEN</span>
            <span className="book-flower" aria-hidden="true">✿</span>
          </div>
          <div className="book book-middle">
            <span className="book-label">little<br />things</span>
            <span className="book-sun" aria-hidden="true">☼</span>
          </div>
          <div className="book book-front">
            <span className="book-label">Pass The<br />Magic On</span>
            <span className="book-heart" aria-hidden="true">♡</span>
          </div>
          <div className="tiny-flower" aria-hidden="true">✿</div>
        </div>
      </section>

      <section className="how-section" id="how-it-works">
        <div className="section-heading">
          <h2>How does it work?</h2>
          <p>Three simple steps to your next can&apos;t-put-it-down.</p>
        </div>
        <div className="steps-grid">
          <article className="step-card">
            <div className="step-icon icon-list" aria-hidden="true">
              <span className="icon-book">▤</span><span className="icon-plus">+</span>
            </div>
            <span className="step-number">01</span>
            <h3>List your books</h3>
            <p>Share the books you&apos;ve finished and are ready to pass along.</p>
          </article>
          <article className="step-card">
            <div className="step-icon icon-discover" aria-hidden="true">
              <span>⌕</span><i />
            </div>
            <span className="step-number">02</span>
            <h3>Discover new reads</h3>
            <p>Browse stories from other readers and find your next favorite.</p>
          </article>
          <article className="step-card">
            <div className="step-icon icon-trade" aria-hidden="true">
              <span>↗</span><span>↙</span>
            </div>
            <span className="step-number">03</span>
            <h3>Make a trade</h3>
            <p>Connect with a reader and arrange a happy little book exchange.</p>
          </article>
        </div>
      </section>

      <section className="about-section" id="about">
        <span className="about-flower" aria-hidden="true">✿</span>
        <div>
          <span className="eyebrow">A book is better when it travels</span>
          <h2>Good stories deserve<br />to be shared.</h2>
          <p>
            Bubble Books is a cozy corner for readers to give their well-loved
            books a new home—and find a little magic in return.
          </p>
        </div>
        <span className="about-heart" aria-hidden="true">♡</span>
      </section>

      <footer className="site-footer">
        <a className="brand" href="#top">
          <span className="brand-mark" aria-hidden="true"><span /><span /></span>
          <span>Bubble Books</span>
        </a>
        <a className="back-to-top" href="#top">Back to top ↑</a>
      </footer>
    </main>
  )
}

export default App
