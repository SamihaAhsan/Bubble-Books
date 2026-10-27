function SignupCompletePage({ selectedGenres, wantedBooks }) {
  const booksWithDetails = wantedBooks.filter((book) => (
    book.title.trim() && book.author.trim()
  ))

  return (
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
      {booksWithDetails.length > 0 && (
        <div className="complete-book-summary">
          <strong>Books on your wish list</strong>
          <ul>
            {booksWithDetails.map((book, index) => (
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
  )
}

export default SignupCompletePage
