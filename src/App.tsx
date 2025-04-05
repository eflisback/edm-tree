import { useEffect, useState } from 'react'
import Home from './pages/home/Home'
import Login from './components/login/Login'
import useAuthStore from './store/authStore'
import { BACKEND_URL } from './constants'

const App = () => {
  const { setAuth } = useAuthStore()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const accessToken = params.get('access_token')
    const expiresIn = params.get('expires_in')

    if (accessToken && expiresIn) {
      setAuth(accessToken, parseInt(expiresIn, 10))
      setIsAuthenticated(true)
      window.history.replaceState({}, document.title, window.location.pathname)
    } else {
      fetch(BACKEND_URL + '/auth/refresh', { credentials: 'include' })
        .then(async (res) => {
          if (res.ok) {
            const data = await res.json()
            setAuth(data.access_token, data.expires_in)
            setIsAuthenticated(true)
          }
        })
        .catch((err) => {
          console.log('Failed to refresh token', err)
          setIsAuthenticated(false)
        })
    }
  }, [setAuth])

  return isAuthenticated ? <Home /> : <Login />
}

export default App
