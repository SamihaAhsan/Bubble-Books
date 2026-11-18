import { useEffect, useState } from 'react'
import { BookCard } from './DashboardComponents.jsx'
import { books as fillerBooks } from './dashboardData.js'
import './DiscoverPage.css'

function DiscoverPage({ onRequest, searchingTitles }) {
  const [recommendedBooks, setRecommendedBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let isCurrentRequest = true

    async function loadRecommendedBooks() {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch('http://localhost:8080/recommended-reads', {
          credentials: 'include',
        })
        if (!response.ok) {
          throw new Error(`Could not load recommended books (error ${response.status}).`)
        }

        const posts = await response.json()
        if (!Array.isArray(posts)) {
          throw new Error('The recommended books response has an unexpected format.')
        }

        const books = posts.map((post, index) => {
          const genres = (post.bookGenres || post.book_genres || []).filter(Boolean)
          const filler = fillerBooks[index % fillerBooks.length]
          return {
            id: post.book_posting_id || post.bookPostingId || post.book_id || post.bookId,
            title: post.bookTitle || post.book_title || '',
            author: [
              post.authorFirstName || post.author_first_name,
              post.authorLastName || post.author_last_name,
            ].filter(Boolean).join(' '),
            summary: post.bookSummary || post.book_summary || '',
            genres,
            genre: genres[0] || '',
            owner_username: post.ownerUsername || post.owner_username || filler.owner_username,
            owner: post.owner || filler.owner,
            location: post.location || filler.location,
            isbn: post.isbn || filler.isbn,
            coverTone: filler.coverTone,
          }
        })

        if (isCurrentRequest) setRecommendedBooks(books)
      } catch (requestError) {
        if (isCurrentRequest) {
          setError(requestError.message || 'Could not load recommended books.')
        }
      } finally {
        if (isCurrentRequest) setIsLoading(false)
      }
    }

    loadRecommendedBooks()
    return () => {
      isCurrentRequest = false
    }
  }, [retryCount])

  const preferredBooks = recommendedBooks.filter((book) => searchingTitles.some(
    (title) => title.toLowerCase() === book.title.toLowerCase(),
  ))
  const recommended = [
    ...preferredBooks,
    ...recommendedBooks.filter((book) => !preferredBooks.includes(book)),
  ]

  return (
    <section className="discover-page">
      <header className="discover-heading">
        <div>
          <h1>Recommended for you</h1>
          {searchingTitles.length > 0 && (
            <p className="discover-personalization-note">
              Matching titles you’re searching for are prioritized.
            </p>
          )}
        </div>
      </header>
      {isLoading ? (
        <p role="status">Loading recommended books…</p>
      ) : error ? (
        <div role="alert">
          <p>{error}</p>
          <button type="button" className="text-button" onClick={() => setRetryCount((count) => count + 1)}>
            Try again
          </button>
        </div>
      ) : recommended.length > 0 ? (
        <div className="book-grid">
          {recommended.map((book) => <BookCard key={book.id} book={book} onRequest={onRequest} />)}
        </div>
      ) : (
        <p>No recommended books are available yet.</p>
      )}
    </section>
  )
}

export default DiscoverPage
