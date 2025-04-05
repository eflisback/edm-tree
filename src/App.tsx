import Home from './pages/home/Home'
import Login from './components/login/Login'

const App = () => {
  const isAuthenticated = false

  return isAuthenticated ? <Home /> : <Login />
}

export default App
