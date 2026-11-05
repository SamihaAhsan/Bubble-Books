import { useState } from 'react'

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
  return (
    <article className="book-card">
      <BookCover book={book} />
      <div className="book-card-content">
        <div className="book-card-heading">
          <div>
            <span className="book-genre">{book.genre}</span>
            <h3>{book.title}</h3>
            <p className="book-author">by {book.author}</p>
          </div>
          <span className="availability"><i />{book.availability}</span>
        </div>
        <p className="book-owner">
          <span aria-hidden="true">⌖</span> {book.owner} <span>·</span> {book.location}
        </p>
        <div className="book-card-actions">
          <button type="button" className="text-button" onClick={() => onRequest(`${book.title} details are a preview.`)}>
            View details
          </button>
          <button
            type="button"
            className="request-button"
            onClick={() => onRequest(isOwner ? `Listing management for “${book.title}” is a preview.` : `Request preview for “${book.title}”.`)}
          >
            {isOwner ? 'Manage book' : 'Request book'}
          </button>
        </div>
      </div>
    </article>
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
