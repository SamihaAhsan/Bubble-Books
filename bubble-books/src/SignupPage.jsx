import { useState } from 'react'
import './SignupPage.css'

const genres = [
  'Fiction',
  'Fantasy',
  'Romance',
  'Mystery & thriller',
  'Science fiction',
  'Historical fiction',
  'Non-fiction',
  'Young adult',
  'Children’s books',
]

function SignupPage() {
  const [step, setStep] = useState('account')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [selectedGenres, setSelectedGenres] = useState([])
  const [wantedBooks, setWantedBooks] = useState([{ title: '', author: '' }])

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

      setStep('preferences')
    } catch (requestError) {
      setError(requestError.message || 'We couldn’t create your account. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function toggleGenre(genre) {
    setSelectedGenres((currentGenres) => (
      currentGenres.includes(genre)
        ? currentGenres.filter((currentGenre) => currentGenre !== genre)
        : [...currentGenres, genre]
    ))
    setError('')
  }

  function updateWantedBook(index, field, value) {
    setWantedBooks((books) => books.map((book, bookIndex) => (
      bookIndex === index ? { ...book, [field]: value } : book
    )))
  }

  function finishPreferences(event) {
    event.preventDefault()
    setError('')

    if (selectedGenres.length === 0) {
      setError('Choose at least one genre to help us find your next favourite read.')
      return
    }

    const hasIncompleteBook = wantedBooks.some((book) => (
      (book.title.trim() && !book.author.trim())
      || (!book.title.trim() && book.author.trim())
    ))

    if (hasIncompleteBook) {
      setError('Please enter both a title and an author for each book, or remove the empty entry.')
      return
    }

    setStep('complete')
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
        {step === 'account' && (
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
                  {isSubmitting ? 'Creating your account…' : 'Next'}
                  {!isSubmitting && <span aria-hidden="true">→</span>}
                </button>
                <p className="signup-note">Just the beginning of a lovely little adventure.</p>
              </form>
            </div>
          </div>
        )}

        {step === 'preferences' && (
          <div className="preferences-layout" aria-labelledby="preferences-title">
            <div className="preferences-heading">
              <span className="eyebrow">A little more about your reading taste</span>
              <h1 id="preferences-title">What do you love to read?</h1>
              <p className="signup-intro">
                Pick your favourite genres and tell us which books you&apos;re hoping to find.
              </p>
            </div>

            <form className="preferences-form" onSubmit={finishPreferences}>
              <fieldset className="genre-fieldset">
                <legend>Choose your favourite genres</legend>
                <p className="preferences-hint">Select as many as you like.</p>
                <div className="genre-options">
                  {genres.map((genre) => (
                    <button
                      className={`genre-option${selectedGenres.includes(genre) ? ' is-selected' : ''}`}
                      type="button"
                      aria-pressed={selectedGenres.includes(genre)}
                      key={genre}
                      onClick={() => toggleGenre(genre)}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="wanted-books-fieldset">
                <legend>Books you&apos;re looking for</legend>
                <p className="preferences-hint">Add a title and author to help readers find a match.</p>
                <div className="wanted-books-list">
                  {wantedBooks.map((book, index) => (
                    <div className="wanted-book-row" key={index}>
                      <label className="signup-field">
                        <span>Book title</span>
                        <input
                          type="text"
                          value={book.title}
                          onChange={(event) => updateWantedBook(index, 'title', event.target.value)}
                          placeholder="e.g. The Secret Garden"
                        />
                      </label>
                      <label className="signup-field">
                        <span>Author</span>
                        <input
                          type="text"
                          value={book.author}
                          onChange={(event) => updateWantedBook(index, 'author', event.target.value)}
                          placeholder="e.g. Frances Hodgson Burnett"
                        />
                      </label>
                      {wantedBooks.length > 1 && (
                        <button
                          className="remove-book-button"
                          type="button"
                          onClick={() => setWantedBooks((books) => books.filter((_, bookIndex) => bookIndex !== index))}
                          aria-label={`Remove book ${index + 1}`}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  className="add-book-button"
                  type="button"
                  onClick={() => setWantedBooks((books) => [...books, { title: '', author: '' }])}
                >
                  <span aria-hidden="true">+</span> Add another book
                </button>
              </fieldset>

              {error && <p className="signup-error preferences-error" role="alert">{error}</p>}
              <div className="preferences-actions">
                <button className="button button-primary" type="submit">
                  Finish setup <span aria-hidden="true">→</span>
                </button>
                <button className="skip-preferences-button" type="button" onClick={() => setStep('complete')}>
                  Skip for now
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 'complete' && (
          <div className="preferences-complete" aria-labelledby="complete-title">
            <span className="complete-flower" aria-hidden="true">✿</span>
            <span className="eyebrow">Welcome to the bookish bunch</span>
            <h1 id="complete-title">Your next chapter starts now.</h1>
            <p className="signup-intro">
              Thanks for sharing a little about what you love to read. You can start exploring Bubble Books now.
            </p>
            {selectedGenres.length > 0 && (
              <p className="complete-summary">
                <strong>Your genres:</strong> {selectedGenres.join(', ')}
              </p>
            )}
            {wantedBooks.some((book) => book.title.trim() && book.author.trim()) && (
              <div className="complete-book-summary">
                <strong>Books on your wish list</strong>
                <ul>
                  {wantedBooks
                    .filter((book) => book.title.trim() && book.author.trim())
                    .map((book, index) => (
                      <li key={`${book.title}-${book.author}-${index}`}>
                        {book.title.trim()} <span>by {book.author.trim()}</span>
                      </li>
                    ))}
                </ul>
              </div>
            )}
            <a className="button button-primary" href="/">
              Explore Bubble Books <span aria-hidden="true">→</span>
            </a>
          </div>
        )}
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
