import LandingPage from './LandingPage.jsx'
import LoginPage from './LoginPage.jsx'
import SignupPage from './SignupPage.jsx'   
import LoginPreferencesPage from './LoginPreferencesPage.jsx'
import BookPostingPage from './BookPostingPage.jsx'
import Dashboard from './Dashboard.jsx'

function App() {
  if (window.location.pathname === '/app') {
    return <Dashboard />
  }

  if (window.location.pathname === '/login') {
    return <LoginPage />
  }

  if (window.location.pathname === '/signup') {
    return <SignupPage />
  }

  if (window.location.pathname === '/login/preferences') {
    return <LoginPreferencesPage />
  }

  if (window.location.pathname === '/signup/posting') {
    return <BookPostingPage />
  }

  return <LandingPage />
}

export default App
