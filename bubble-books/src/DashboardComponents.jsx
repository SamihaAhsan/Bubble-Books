import { useEffect, useState } from 'react'

function BookCover({ book }) {
  const [hasImageError, setHasImageError] = useState(false)

  return (
    <div className={`book-cover cover-${book.coverTone}`}>
      <div className="cover-fallback" aria-hidden="true">
        <span className="cover-sparkle">✳</span>
        <span className="cover-title">{book.title}</span>
        <span className="cover-author">{book.author}</span>
      </div>
      {!hasImageError && (
        <img
          src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
          alt={`Cover of ${book.title}`}
          loading="lazy"
          onError={() => setHasImageError(true)}
        />
      )}
    </div>
  )
}

export function BookCard({ book, onRequest, isOwner = false }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const bookGenres = Array.isArray(book.genres)
    ? book.genres
    : Array.isArray(book.genre)
      ? book.genre
      : book.genre
        ? [book.genre]
        : []

  useEffect(() => {
    if (!isDetailsOpen) return undefined

    const previousOverflow = document.body.style.overflow
    function closeOnEscape(event) {
      if (event.key === 'Escape') setIsDetailsOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [isDetailsOpen])

  return (
    <>
      <article className="book-card">
        <BookCover book={book} />
        <div className="book-card-content">
          <div className="book-card-heading">
            <div>
              <span className="book-genre">{book.genre}</span>
              <h3>{book.title}</h3>
              <p className="book-author">by {book.author}</p>
            </div>
          </div>
          <p className="book-owner">
            <span aria-hidden="true">⌖</span> {book.owner_username || book.owner} <span>·</span> {book.location}
          </p>
          <div className="book-card-actions">
            <button type="button" className="text-button" onClick={() => setIsDetailsOpen(true)}>
              View details
            </button>
            <button
              type="button"
              className="request-button"
              onClick={() => {
                if (isOwner) {
                  onRequest(`Listing management for “${book.title}” is a preview.`)
                  return
                }
                onRequest(`Request preview for “${book.title}”.`)
              }}
            >
              {isOwner ? 'Manage book' : 'Request book'}
            </button>
          </div>
        </div>
      </article>
      {isDetailsOpen && (
        <div className="book-details-overlay" onClick={(event) => {
          if (event.target === event.currentTarget) setIsDetailsOpen(false)
        }}>
          <section
            className="book-details"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`book-details-title-${book.id}`}
          >
            <header className="book-details-header">
              <span className="eyebrow">A closer look</span>
              <button
                type="button"
                className="book-details-close"
                aria-label="Close book details"
                autoFocus
                onClick={() => setIsDetailsOpen(false)}
              >
                ×
              </button>
            </header>
            <div className="book-details-layout">
              <BookCover book={book} />
              <div className="book-details-content">
                <h2 id={`book-details-title-${book.id}`}>{book.title}</h2>
                <p className="book-details-author">by {book.author}</p>
                <section className="book-details-section" aria-labelledby={`book-genres-title-${book.id}`}>
                  <h3 id={`book-genres-title-${book.id}`}>Genres</h3>
                  {bookGenres.length > 0 ? (
                    <div className="book-details-genres">
                      {bookGenres.map((genre) => <span className="book-details-genre" key={genre}>{genre}</span>)}
                    </div>
                  ) : <p>Genre information is not available.</p>}
                </section>
                <section className="book-details-section" aria-labelledby={`book-owner-title-${book.id}`}>
                  <h3 id={`book-owner-title-${book.id}`}>Owner username</h3>
                  <p>{book.owner_username || book.owner || 'Owner not listed'}</p>
                  <p className="book-details-location">{book.location || 'Location not listed'}</p>
                </section>
                <section className="book-details-section" aria-labelledby={`book-summary-title-${book.id}`}>
                  <h3 id={`book-summary-title-${book.id}`}>About this book</h3>
                  <p>{book.summary || 'A summary has not been added for this book yet.'}</p>
                </section>
                <button
                  type="button"
                  className="request-button book-details-done"
                  onClick={() => setIsDetailsOpen(false)}
                >
                  Close details
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  )
}

export function SectionHeading({ eyebrow, title, action, onAction }) {
  return (
    <div className="section-title-row">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {action && <button type="button" className="text-button section-action" onClick={onAction}>{action} <span aria-hidden="true">→</span></button>}
    </div>
  )
}

export function PageIntro({ eyebrow, title, description }) {
  return (
    <div className="page-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}
