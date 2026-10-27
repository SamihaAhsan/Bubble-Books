import { useState } from 'react'
import './SignupPage.css'
import SignupCompletePage from './LoginCompletePage.jsx'

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

function SignupPreferencesPage() {
  const [step, setStep] = useState('preferences')
  const [error, setError] = useState('')
  const [selectedGenres, setSelectedGenres] = useState([])
  const [wantedBooks, setWantedBooks] = useState([{ title: '', author: '' }])

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

      <section className="signup-content" aria-labelledby="preferences-title">
        {step === 'preferences' && (
          <div className="preferences-layout">
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
          <SignupCompletePage
            selectedGenres={selectedGenres}
            wantedBooks={wantedBooks}
          />
        )}
      </section>
    </main>
  )
}

export default SignupPreferencesPage
