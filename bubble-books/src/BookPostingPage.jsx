import { useState } from 'react'
import './SignupPage.css'
import genres from './genreOptions.js'

function BookPostingPage() {
  const [selectedGenres, setSelectedGenres] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  function toggleGenre(genre) {
    setSelectedGenres((currentGenres) => (
      currentGenres.includes(genre)
        ? currentGenres.filter((currentGenre) => currentGenre !== genre)
        : [...currentGenres, genre]
    ))
    setError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (selectedGenres.length === 0) {
      setError('Choose at least one genre for your book.')
      return
    }

    const formData = new FormData(event.currentTarget)
    const book = {
      book_name: formData.get('title').trim(),
      author_first_name: formData.get('authorFirstName').trim(),
      author_last_name: formData.get('authorLastName').trim(),
      summary: formData.get('summary').trim(),
      genre: selectedGenres,
    }

    setIsSubmitting(true)

    try {
      const csrfResponse = await fetch('http://localhost:8080/csrf', {
        credentials: 'include',
      })

      if (!csrfResponse.ok) {
        throw new Error('Could not prepare to post your book. Please try again.')
      }

      const csrfData = await csrfResponse.json()
      const response = await fetch('http://localhost:8080/my-books', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          [csrfData.headerName]: csrfData.token,
        },
        body: JSON.stringify([book]),
      })

      if (!response.ok) {
        throw new Error(`Could not post your book (error ${response.status}). Please try again.`)
      }

      window.location.assign('/app')
    } catch (requestError) {
      setError(requestError.message || 'Could not post your book. Please try again.')
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
        <a className="signup-back-link" href="/login/preferences">Back to preferences</a>
      </header>

      <section className="signup-content" aria-labelledby="book-posting-title">
        <div className="preferences-layout">
          <div className="preferences-heading">
            <span className="eyebrow">Pass a good story along</span>
            <h1 id="book-posting-title">Post a book of your own</h1>
            <p className="signup-intro">
              Share a book from your shelf with the Bubble Books community.
            </p>
          </div>

          <form className="preferences-form book-posting-form" onSubmit={handleSubmit}>
            <label className="signup-field">
              <span>Book title</span>
              <input name="title" type="text" placeholder="e.g. The Secret Garden" required />
            </label>

            <div className="signup-fields book-author-fields">
              <label className="signup-field">
                <span>Author first name</span>
                <input name="authorFirstName" type="text" autoComplete="given-name" required />
              </label>
              <label className="signup-field">
                <span>Author last name</span>
                <input name="authorLastName" type="text" autoComplete="family-name" required />
              </label>
            </div>

            <label className="signup-field">
              <span>Summary</span>
              <textarea name="summary" rows="5" placeholder="What is the book about?" required />
            </label>

            <fieldset className="genre-fieldset">
              <legend>Book genres</legend>
              <p className="preferences-hint">Choose all the genres that fit.</p>
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

            {error && <p className="signup-error preferences-error" role="alert">{error}</p>}
            <div className="preferences-actions">
              <button className="button button-primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Posting your book…' : 'Post book'}
                {!isSubmitting && <span aria-hidden="true">→</span>}
              </button>
              <a className="skip-preferences-button" href="/app">Skip for now</a>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export default BookPostingPage
