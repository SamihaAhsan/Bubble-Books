import { useState } from 'react'
import './Dashboard.css'
import DiscoverPage from './DiscoverPage.jsx'
import ExplorePage from './ExplorePage.jsx'
import ProfilePage from './ProfilePage.jsx'
import RequestsPage from './RequestsPage.jsx'
import { navigation } from './dashboardData.js'

function Dashboard() {
  const [activePage, setActivePage] = useState('discover')
  const [search, setSearch] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('All genres')
  const [requestFilter, setRequestFilter] = useState('All requests')
  const [searchingTitles, setSearchingTitles] = useState([])
  const [notice, setNotice] = useState('')
  const [settings, setSettings] = useState({
    email: 'jamie.smith@example.com',
    location: 'Toronto, Ontario',
    favoriteGenres: ['Fantasy', 'Mystery', 'Romance', 'Contemporary'],
  })

  function showNotice(message) {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 2800)
  }

  function updateSettings(event) {
    const { checked, name, type, value } = event.target
    setSettings((currentSettings) => {
      if (name === 'favoriteGenres') {
        return {
          ...currentSettings,
          favoriteGenres: checked
            ? [...currentSettings.favoriteGenres, value]
            : currentSettings.favoriteGenres.filter((genre) => genre !== value),
        }
      }

      return {
        ...currentSettings,
        [name]: type === 'checkbox' ? checked : value,
      }
    })
  }

  function addSearchingTitle(title) {
    const normalizedTitle = title.trim()
    if (searchingTitles.some((currentTitle) => currentTitle.toLowerCase() === normalizedTitle.toLowerCase())) {
      showNotice('That title is already on your search list.')
      return false
    }

    setSearchingTitles((currentTitles) => [...currentTitles, normalizedTitle])
    return true
  }

  function renderActivePage() {
    switch (activePage) {
      case 'discover':
        return <DiscoverPage onRequest={showNotice} searchingTitles={searchingTitles} />
      case 'explore':
        return (
          <ExplorePage
            search={search}
            onSearchChange={setSearch}
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
            onRequest={showNotice}
          />
        )
      case 'requests':
        return (
          <RequestsPage
            requestFilter={requestFilter}
            onRequestFilterChange={setRequestFilter}
            onRequest={showNotice}
          />
        )
      case 'profile':
        return (
          <ProfilePage
            onRequest={showNotice}
            settings={settings}
            onSettingsChange={updateSettings}
            onSave={() => showNotice('Your profile settings are saved for this session.')}
            searchingTitles={searchingTitles}
            onAddSearchingTitle={addSearchingTitle}
            onRemoveSearchingTitle={(title) => setSearchingTitles((currentTitles) => (
              currentTitles.filter((currentTitle) => currentTitle !== title)
            ))}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <a className="brand dashboard-brand" href="/app" aria-label="Bubble Books dashboard">
          <span className="brand-mark" aria-hidden="true"><span /><span /></span>
          <span>Bubble Books</span>
        </a>
        <div className="sidebar-label">YOUR BOOK NOOK</div>
        <nav className="dashboard-nav" aria-label="Application navigation">
          {navigation.map((item) => (
            <button
              type="button"
              className={`dashboard-nav-link${activePage === item.id ? ' is-active' : ''}`}
              aria-current={activePage === item.id ? 'page' : undefined}
              key={item.id}
              onClick={() => setActivePage(item.id)}
            >
              <span className="nav-icon" aria-hidden="true">{item.icon}</span>
              {item.label}
              {item.id === 'requests' && <span className="nav-count">2</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-note">
          <span aria-hidden="true">✿</span>
          <p>Good stories are even better when they&apos;re shared.</p>
        </div>
        <button type="button" className="sidebar-user" onClick={() => setActivePage('profile')}>
          <span className="profile-avatar">JS</span>
          <span className="sidebar-user-copy"><strong>Jamie Smith</strong><small>Book lover</small></span>
          <span className="user-more" aria-hidden="true">···</span>
        </button>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="topbar-actions">
            <span className="topbar-greeting">Hello, Jamie <span aria-hidden="true">✿</span></span>
            <button type="button" className="notification-button" aria-label="Notifications" onClick={() => showNotice('You’re all caught up on your bookish updates.')}>♡<i /></button>
            <button type="button" className="profile-avatar topbar-avatar" aria-label="Open profile" onClick={() => setActivePage('profile')}>JS</button>
          </div>
        </header>
        <main className="dashboard-content">
          {renderActivePage()}
        </main>
      </div>

      <nav className="mobile-nav" aria-label="Application navigation">
        {navigation.map((item) => (
          <button
            type="button"
            className={activePage === item.id ? 'is-active' : ''}
            aria-current={activePage === item.id ? 'page' : undefined}
            key={item.id}
            onClick={() => setActivePage(item.id)}
          >
            <span aria-hidden="true">{item.icon}</span>
            <small>{item.label === 'Explore Books' ? 'Explore' : item.label === 'My Requests' ? 'Requests' : item.label === 'My Profile' ? 'Profile' : item.label}</small>
          </button>
        ))}
      </nav>

      {notice && <div className="dashboard-toast" role="status">{notice}</div>}
    </div>
  )
}

export default Dashboard
