import { useState } from 'react'
import { BookCard, PageIntro, SectionHeading } from './DashboardComponents.jsx'
import { books } from './dashboardData.js'
import './ProfileSettings.css'

const genres = [
  'Fantasy',
  'Romance',
  'Mystery',
  'Science Fiction',
  'Thriller',
  'Contemporary',
  'Historical Fiction',
  'Non-Fiction',
]

function ProfilePage({
  onRequest,
  settings,
  onSettingsChange,
  onSave,
  searchingTitles,
  onAddSearchingTitle,
  onRemoveSearchingTitle,
}) {
  const [newSearchingTitle, setNewSearchingTitle] = useState('')

  function handleAddSearchingTitle(event) {
    event.preventDefault()
    const title = newSearchingTitle.trim()
    if (title && onAddSearchingTitle(title)) {
      setNewSearchingTitle('')
    }
  }

  return (
    <section className="page-section profile-page">
      <PageIntro eyebrow="A little corner that’s all yours" title="My profile" description="Let other readers know a little about the person behind the bookshelf." />
      <div className="profile-card">
        <div className="profile-avatar profile-avatar-large">JS</div>
        <div className="profile-main">
          <span className="eyebrow">Bubble Books reader since 2024</span>
          <h2>Jamie Smith</h2>
          <p><span aria-hidden="true">⌖</span> {settings.location}</p>
          <p className="profile-bio">Always up for a little bit of magic, a clever mystery, or a story that stays with me long after the last page.</p>
        </div>
      </div>
      <form
        className="settings-form profile-settings-form"
        onSubmit={(event) => {
          event.preventDefault()
          onSave()
        }}
      >
        <section className="settings-card">
          <div className="settings-card-heading">
            <span className="eyebrow">Your account</span>
            <h2>Account details</h2>
            <p>Keep your contact and location details up to date.</p>
          </div>
          <div className="settings-fields">
            <label className="settings-field">
              <span>Email address</span>
              <input type="email" name="email" value={settings.email} onChange={onSettingsChange} />
            </label>
            <label className="settings-field">
              <span>Location</span>
              <input type="text" name="location" value={settings.location} onChange={onSettingsChange} />
            </label>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card-heading">
            <span className="eyebrow">What you love to read</span>
            <h2>Reading interests</h2>
            <p>Choose the genres you’d like to see around your nook.</p>
          </div>
          <div className="settings-genre-grid">
            {genres.map((genre) => (
              <label className="settings-checkbox" key={genre}>
                <input
                  type="checkbox"
                  name="favoriteGenres"
                  value={genre}
                  checked={settings.favoriteGenres.includes(genre)}
                  onChange={onSettingsChange}
                />
                <span>{genre}</span>
              </label>
            ))}
          </div>
        </section>

        <div className="settings-actions">
          <button type="submit" className="button button-primary">Save profile</button>
        </div>
      </form>
      <section className="profile-section searching-titles-section">
        <SectionHeading
          eyebrow="Help us find your next read"
          title="Titles I’m searching for"
        />
        <p className="searching-titles-description">
          Add books you’re looking for. When they’re in our catalog, we’ll prioritize them in your recommendations.
        </p>
        <form className="searching-title-form" onSubmit={handleAddSearchingTitle}>
          <label className="settings-field">
            <span>Book title</span>
            <input
              type="text"
              value={newSearchingTitle}
              onChange={(event) => setNewSearchingTitle(event.target.value)}
              placeholder="e.g. The Hobbit"
              aria-label="Book title to search for"
            />
          </label>
          <button type="submit" className="button button-primary" disabled={!newSearchingTitle.trim()}>
            Add title
          </button>
        </form>
        {searchingTitles.length > 0 ? (
          <ul className="searching-title-list">
            {searchingTitles.map((title) => (
              <li className="searching-title-item" key={title}>
                <span>{title}</span>
                <button
                  type="button"
                  className="searching-title-remove"
                  onClick={() => onRemoveSearchingTitle(title)}
                  aria-label={`Remove ${title} from titles you’re searching for`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="searching-titles-empty">You haven’t added any titles yet.</p>
        )}
      </section>
      <section className="profile-section">
        <SectionHeading eyebrow="Ready for another reader" title="Books I’ve shared" action="Add a book" onAction={() => onRequest('Adding a book is a visual preview.')} />
        <div className="book-grid profile-books">
          {books.slice(0, 3).map((book) => (
            <BookCard
              key={book.id}
              book={{ ...book, owner: 'Jamie S.', location: 'Toronto, ON' }}
              onRequest={onRequest}
              isOwner
            />
          ))}
        </div>
      </section>
    </section>
  )
}

export default ProfilePage
