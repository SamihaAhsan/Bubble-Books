import { useEffect, useRef, useState } from 'react'
import './SignupPage.css'
import genres from './genreOptions.js'

function SignupPreferencesPage() {
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookCatalog, setBookCatalog] = useState([])
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(true)
  const [catalogError, setCatalogError] = useState('')
  const [catalogRetry, setCatalogRetry] = useState(0)
  const [selectedGenres, setSelectedGenres] = useState([])
  const [savedGenres, setSavedGenres] = useState(null)
  const [wantedBooks, setWantedBooks] = useState([])
  const [bookSearch, setBookSearch] = useState('')
  const [activeBookIndex, setActiveBookIndex] = useState(0)
  const savedInterestedBookIds = useRef(new Set())
  const genresAreSaved = savedGenres !== null
    && savedGenres.length === selectedGenres.length
    && selectedGenres.every((genre) => savedGenres.includes(genre))

  useEffect(() => {
    let isCurrentRequest = true

    async function loadBookCatalog() {
      setIsLoadingCatalog(true)
      setCatalogError('')

      try {
        const response = await fetch('http://localhost:8080/all-books', {
          credentials: 'include',
        })

        if (!response.ok) {
          throw new Error(`Could not load books (error ${response.status}).`)
        }

        const data = await response.json()
        const { book_id, allBookTitles, allBookAuthorFirstNames, allBookAuthorLastNames } = data
        const arrays = [book_id, allBookTitles, allBookAuthorFirstNames, allBookAuthorLastNames]

        if (
          !arrays.every(Array.isArray)
          || !arrays.every((values) => values.length === book_id.length)
        ) {
          throw new Error('The book catalog response has an unexpected format.')
        }

        const catalog = book_id.map((id, index) => ({
          id,
          title: allBookTitles[index],
          author: [allBookAuthorFirstNames[index], allBookAuthorLastNames[index]]
            .filter(Boolean)
            .join(' '),
        }))

        if (isCurrentRequest) {
          setBookCatalog(catalog)
        }
      } catch (requestError) {
        if (isCurrentRequest) {
          setCatalogError(requestError.message || 'Could not load the book catalog.')
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoadingCatalog(false)
        }
      }
    }

    loadBookCatalog()

    return () => {
      isCurrentRequest = false
    }
  }, [catalogRetry])

  function toggleGenre(genre) {
    setSelectedGenres((currentGenres) => (
      currentGenres.includes(genre)
        ? currentGenres.filter((currentGenre) => currentGenre !== genre)
        : [...currentGenres, genre]
    ))
    setError('')
  }

  async function persistGenres(genresToSave) {
    const csrfResponse = await fetch('http://localhost:8080/csrf', {
      credentials: 'include',
    })

    if (!csrfResponse.ok) {
      throw new Error('Could not prepare to save your genres. Please try again.')
    }

    const csrfData = await csrfResponse.json()
    const response = await fetch('http://localhost:8080/my-genres', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        [csrfData.headerName]: csrfData.token,
      },
      body: JSON.stringify(genresToSave),
    })

    if (!response.ok) {
      throw new Error(`Could not save your genres (error ${response.status}). Please try again.`)
    }
  }

  async function persistInterestedTitles(selectedBooks) {
    const booksToSave = selectedBooks.filter((book) => (
      !savedInterestedBookIds.current.has(book.id)
    ))

    if (booksToSave.length === 0) {
      return
    }

    const csrfResponse = await fetch('http://localhost:8080/csrf', {
      credentials: 'include',
    })

    if (!csrfResponse.ok) {
      throw new Error('Could not prepare to save your wanted books. Please try again.')
    }

    const csrfData = await csrfResponse.json()

    for (const book of booksToSave) {
      if (!book.id) {
        throw new Error(`Could not save "${book.title}" because its book ID is missing.`)
      }

      const response = await fetch('http://localhost:8080/interested-titles', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          [csrfData.headerName]: csrfData.token,
        },
        body: JSON.stringify(book.id),
      })

      if (!response.ok) {
        throw new Error(`Could not save "${book.title}" to your wanted books (error ${response.status}). Please try again.`)
      }

      savedInterestedBookIds.current.add(book.id)
    }
  }

  async function saveSelectedGenres() {
    setError('')

    if (selectedGenres.length === 0) {
      setError('Choose at least one genre to help us find your next favourite read.')
      return
    }

    setIsSubmitting(true)

    try {
      await persistGenres(selectedGenres)
      setSavedGenres([...selectedGenres])
    } catch (requestError) {
      setError(requestError.message || 'Could not save your genres. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const bookSuggestions = bookSearch.trim()
    ? bookCatalog.filter((book) => book.title?.toLowerCase().includes(bookSearch.trim().toLowerCase()))
    : []

  function addWantedBook(book) {
    setWantedBooks((currentBooks) => (
      currentBooks.some((currentBook) => currentBook.title.toLowerCase() === book.title.toLowerCase())
        ? currentBooks
        : [...currentBooks, { id: book.id, title: book.title, author: book.author }]
    ))
    setBookSearch('')
    setActiveBookIndex(0)
    setError('')
  }

  function handleBookSearchKeyDown(event) {
    if (event.key === 'ArrowDown' && bookSuggestions.length > 0) {
      event.preventDefault()
      setActiveBookIndex((index) => (index + 1) % bookSuggestions.length)
    } else if (event.key === 'ArrowUp' && bookSuggestions.length > 0) {
      event.preventDefault()
      setActiveBookIndex((index) => (index - 1 + bookSuggestions.length) % bookSuggestions.length)
    } else if (event.key === 'Enter' && bookSuggestions[activeBookIndex]) {
      event.preventDefault()
      addWantedBook(bookSuggestions[activeBookIndex])
    } else if (event.key === 'Escape') {
      setBookSearch('')
      setActiveBookIndex(0)
    }
  }

  async function finishPreferences(event) {
    event.preventDefault()
    setError('')

    if (selectedGenres.length === 0) {
      setError('Choose at least one genre to help us find your next favourite read.')
      return
    }

    setIsSubmitting(true)

    try {
      if (!genresAreSaved) {
        await persistGenres(selectedGenres)
      }

      await persistInterestedTitles(wantedBooks)
      window.location.assign('/signup/posting')
    } catch (requestError) {
      setError(requestError.message || 'Could not save your preferences. Please try again.')
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

      <section className="signup-content" aria-labelledby="preferences-title">
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
                <p className="preferences-hint">Select or unselect genres, then save your choices together.</p>
                <div className="genre-options">
                  {genres.map((genre) => (
                    <button
                      className={`genre-option${selectedGenres.includes(genre) ? ' is-selected' : ''}`}
                      type="button"
                      aria-pressed={selectedGenres.includes(genre)}
                      key={genre}
                      onClick={() => toggleGenre(genre)}
                      onDoubleClick={() => setSelectedGenres((currentGenres) => (
                        currentGenres.filter((currentGenre) => currentGenre !== genre)
                      ))}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
                <div className="genre-save-row">
                  <button
                    className="button button-secondary button-small"
                    type="button"
                    onClick={saveSelectedGenres}
                    disabled={isSubmitting || genresAreSaved}
                  >
                    {isSubmitting ? 'Saving genres…' : genresAreSaved ? 'Genres saved' : 'Save genres'}
                  </button>
                </div>
              </fieldset>

              <fieldset className="wanted-books-fieldset">
                <legend>Books you&apos;re looking for</legend>
                <p className="preferences-hint">Search a title and choose a result to see its author.</p>
                <div className="signup-field wanted-book-search">
                  <label htmlFor="wanted-book-search">Search book titles</label>
                  <input
                    id="wanted-book-search"
                    type="search"
                    value={bookSearch}
                    onChange={(event) => {
                      setBookSearch(event.target.value)
                      setActiveBookIndex(0)
                    }}
                    onKeyDown={handleBookSearchKeyDown}
                    placeholder="e.g. The Night Circus"
                    role="combobox"
                    aria-autocomplete="list"
                    aria-expanded={bookSearch.trim().length > 0}
                    aria-controls={bookSearch.trim() ? 'wanted-book-suggestions' : undefined}
                    aria-activedescendant={
                      bookSuggestions[activeBookIndex]
                        ? `wanted-book-option-${bookSuggestions[activeBookIndex].id}`
                        : undefined
                    }
                  />
                  {catalogError && (
                    <p className="book-catalog-error" role="alert">
                      {catalogError}{' '}
                      <button type="button" onClick={() => setCatalogRetry((retry) => retry + 1)}>
                        Try again
                      </button>
                    </p>
                  )}
                  {bookSearch.trim() && (
                    <div className="book-suggestions" id="wanted-book-suggestions" role="listbox">
                      {isLoadingCatalog ? (
                        <p className="book-suggestions-empty">Loading books…</p>
                      ) : catalogError ? null : bookSuggestions.length > 0 ? bookSuggestions.map((book, index) => (
                        <button
                          className={`book-suggestion${index === activeBookIndex ? ' is-active' : ''}`}
                          id={`wanted-book-option-${book.id}`}
                          type="button"
                          role="option"
                          aria-selected={index === activeBookIndex}
                          key={book.id}
                          onMouseEnter={() => setActiveBookIndex(index)}
                          onClick={() => addWantedBook(book)}
                        >
                          <span>{book.title}</span>
                          <span>by {book.author}</span>
                        </button>
                      )) : (
                        <p className="book-suggestions-empty">No matching titles found.</p>
                      )}
                    </div>
                  )}
                </div>
                {wantedBooks.length > 0 && (
                  <ul className="selected-wanted-books" aria-label="Books on your wish list">
                    {wantedBooks.map((book, index) => (
                      <li className="selected-wanted-book" key={`${book.title}-${book.author}`}>
                        <span>{book.title} <span>by {book.author}</span></span>
                        <button
                          className="remove-book-button"
                          type="button"
                          onClick={() => setWantedBooks((currentBooks) => currentBooks.filter((_, bookIndex) => bookIndex !== index))}
                          aria-label={`Remove ${book.title} by ${book.author}`}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </fieldset>

              {error && <p className="signup-error preferences-error" role="alert">{error}</p>}
              <div className="preferences-actions">
                <button className="button button-primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (genresAreSaved ? 'Finishing setup…' : 'Saving your genres…') : 'Finish setup'}
                  {!isSubmitting && <span aria-hidden="true">→</span>}
                </button>
              </div>
            </form>
        </div>
      </section>
    </main>
  )
}

export default SignupPreferencesPage
