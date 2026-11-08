import { useEffect, useState } from 'react'
import { BookCard, PageIntro } from './DashboardComponents.jsx'
import { books } from './dashboardData.js'
import genres from './genreOptions.js'

function ExplorePage({ search, onSearchChange, selectedGenre, onGenreChange, onRequest }) {
  const [bookCatalog, setBookCatalog] = useState([])
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(true)
  const [catalogError, setCatalogError] = useState('')
  const [catalogRetry, setCatalogRetry] = useState(0)
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0)
  const [areSuggestionsOpen, setAreSuggestionsOpen] = useState(false)

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

  const normalizedSearch = search.trim().toLowerCase()
  const suggestions = normalizedSearch
    ? bookCatalog.filter((book) => (
      `${book.title} ${book.author}`.toLowerCase().includes(normalizedSearch)
    )).slice(0, 8)
    : []

  const filteredBooks = books.filter((book) => {
    const matchesSearch = `${book.title} ${book.author} ${book.genre}`
      .toLowerCase()
      .includes(search.toLowerCase())
    const matchesGenre = selectedGenre === 'All genres' || book.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  function handleSearchKeyDown(event) {
    if (event.key === 'ArrowDown' && suggestions.length > 0) {
      event.preventDefault()
      setAreSuggestionsOpen(true)
      setActiveSuggestionIndex((index) => (index + 1) % suggestions.length)
    } else if (event.key === 'ArrowUp' && suggestions.length > 0) {
      event.preventDefault()
      setAreSuggestionsOpen(true)
      setActiveSuggestionIndex((index) => (index - 1 + suggestions.length) % suggestions.length)
    } else if (event.key === 'Enter' && areSuggestionsOpen && suggestions[activeSuggestionIndex]) {
      event.preventDefault()
      onSearchChange(suggestions[activeSuggestionIndex].title)
      setAreSuggestionsOpen(false)
    } else if (event.key === 'Escape') {
      setAreSuggestionsOpen(false)
    }
  }

  return (
    <section className="page-section explore-page">
      <PageIntro eyebrow="The next chapter is out there" title="Explore books" description="Find a well-loved story and give it a lovely new home." />
      <div className="search-panel">
        <div className="explore-search-wrap">
          <label className="search-input-wrap">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={search}
              onChange={(event) => {
                onSearchChange(event.target.value)
                setActiveSuggestionIndex(0)
                setAreSuggestionsOpen(true)
              }}
              onFocus={() => setAreSuggestionsOpen(true)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search by book title or author..."
              aria-label="Search by book title or author"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={areSuggestionsOpen && suggestions.length > 0}
              aria-controls={suggestions.length > 0 ? 'explore-book-suggestions' : undefined}
              aria-activedescendant={
                areSuggestionsOpen && suggestions[activeSuggestionIndex]
                  ? `explore-book-option-${suggestions[activeSuggestionIndex].id}`
                  : undefined
              }
            />
          </label>
          {areSuggestionsOpen && normalizedSearch && (
            <div className="explore-book-suggestions" id="explore-book-suggestions" role="listbox">
              {isLoadingCatalog ? (
                <p className="explore-book-suggestions-message">Loading books…</p>
              ) : catalogError ? (
                <p className="explore-book-suggestions-message" role="alert">
                  {catalogError}{' '}
                  <button type="button" onClick={() => setCatalogRetry((retry) => retry + 1)}>
                    Try again
                  </button>
                </p>
              ) : suggestions.length > 0 ? suggestions.map((book, index) => (
                <button
                  className={`explore-book-suggestion${index === activeSuggestionIndex ? ' is-active' : ''}`}
                  id={`explore-book-option-${book.id}`}
                  type="button"
                  role="option"
                  aria-selected={index === activeSuggestionIndex}
                  key={book.id}
                  onMouseEnter={() => setActiveSuggestionIndex(index)}
                  onClick={() => {
                    onSearchChange(book.title)
                    setAreSuggestionsOpen(false)
                  }}
                >
                  <span>{book.title}</span>
                  <span>by {book.author}</span>
                </button>
              )) : (
                <p className="explore-book-suggestions-message">No matching titles in the catalog.</p>
              )}
            </div>
          )}
        </div>
        <label className="filter-select">
          <span className="sr-only">Filter by genre</span>
          <select value={selectedGenre} onChange={(event) => onGenreChange(event.target.value)}>
            <option>All genres</option>
            {genres.map((genre) => <option key={genre}>{genre}</option>)}
          </select>
        </label>
      </div>
      <div className="filter-chips" aria-label="Filter books by genre">
        {['All genres', ...genres].map((genre) => (
          <button
            type="button"
            key={genre}
            className={`filter-chip${selectedGenre === genre ? ' is-active' : ''}`}
            aria-pressed={selectedGenre === genre}
            onClick={() => onGenreChange(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
      <div className="results-heading">
        <h2>{filteredBooks.length} lovely {filteredBooks.length === 1 ? 'read' : 'reads'}</h2>
        <span>Shared by readers near you</span>
      </div>
      {filteredBooks.length > 0 ? (
        <div className="book-grid">
          {filteredBooks.map((book) => <BookCard key={book.id} book={book} onRequest={onRequest} />)}
        </div>
      ) : (
        <div className="empty-state">
          <span aria-hidden="true">⌕</span>
          <h2>No books found just yet</h2>
          <p>Try a different title, author, or genre to find your next read.</p>
          <button type="button" className="text-button" onClick={() => { onSearchChange(''); onGenreChange('All genres') }}>
            Clear filters
          </button>
        </div>
      )}
    </section>
  )
}

export default ExplorePage
