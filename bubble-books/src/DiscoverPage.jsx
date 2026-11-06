import { useState } from 'react'
import { BookCard } from './DashboardComponents.jsx'
import { books } from './dashboardData.js'
import './DiscoverPage.css'

function DiscoverPage({ onRequest, searchingTitles }) {
  const [sortOrder, setSortOrder] = useState('recommended')
  const preferredBooks = books.filter((book) => searchingTitles.some(
    (title) => title.toLowerCase() === book.title.toLowerCase(),
  ))
  const recommended = [
    ...preferredBooks,
    ...books.filter((book) => book.recommended && !preferredBooks.includes(book)),
  ]
  const sortedBooks = sortOrder === 'genre'
    ? [...recommended].sort((first, second) => first.genre.localeCompare(second.genre))
    : recommended

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
        <label className="discover-sort">
          <span>Sort by</span>
          <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
            <option value="recommended">Recommended</option>
            <option value="genre">Genre (A–Z)</option>
          </select>
        </label>
      </header>
      <div className="book-grid">
        {sortedBooks.map((book) => <BookCard key={book.id} book={book} onRequest={onRequest} />)}
      </div>
    </section>
  )
}

export default DiscoverPage
