import LandingPage from './LandingPage.jsx'
import SignupPage from './SignupPage.jsx'

function App() {
  if (window.location.pathname === '/signup') {
    return <SignupPage />
  }

  return <LandingPage />
}

export default App
