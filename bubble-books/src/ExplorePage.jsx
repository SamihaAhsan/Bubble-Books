import { BookCard, PageIntro } from './DashboardComponents.jsx'
import { books, genres } from './dashboardData.js'

function ExplorePage({ search, onSearchChange, selectedGenre, onGenreChange, onRequest }) {
  const filteredBooks = books.filter((book) => {
    const matchesSearch = `${book.title} ${book.author} ${book.genre}`
      .toLowerCase()
      .includes(search.toLowerCase())
    const matchesGenre = selectedGenre === 'All genres' || book.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  return (
    <section className="page-section explore-page">
      <PageIntro eyebrow="The next chapter is out there" title="Explore books" description="Find a well-loved story and give it a lovely new home." />
      <div className="search-panel">
        <label className="search-input-wrap">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by book title or author..."
            aria-label="Search by book title or author"
          />
        </label>
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
