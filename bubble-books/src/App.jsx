import LandingPage from './LandingPage.jsx'
import LoginPage from './LoginPage.jsx'
import SignupPage from './SignupPage.jsx'   
import LoginPreferencesPage from './LoginPreferencesPage.jsx'

function App() {
  if (window.location.pathname === '/login') {
    return <LoginPage />
  }

  if (window.location.pathname === '/signup') {
    return <SignupPage />
  }

  if (window.location.pathname === '/login/preferences') {
    return <LoginPreferencesPage />
  }

  return <LandingPage />
}

export default App
