import { BACKEND_URL } from '../../config/environment'
import styles from './Login.module.scss'
import { FaGithub, FaHandSparkles, FaSpotify } from 'react-icons/fa6'

const headerLinks = [{ icon: <FaGithub />, href: 'https://github.com/eflisback' }]

const PageHeader = () => (
  <div className={styles.header}>
    <span>
      edmtree.<span className={styles.colored}>app</span>
    </span>
    <div className={styles.socials}>
      {headerLinks.map((link, i) => (
        <a key={i} href={link.href} target='_blank' rel='noopener noreferrer'>
          {link.icon}
        </a>
      ))}
    </div>
  </div>
)

const LoginPanel = () => {
  const handleLogin = () => {
    window.location.href = `${BACKEND_URL}/auth/login`
  }

  return (
    <div className={styles.sideBar}>
      <div className={styles.header}>
        <FaHandSparkles />
        <span>Welcome to EDM Tree!</span>
      </div>
      <span className={styles.description}>
        In order to maximize the funkyness of this tool, it relies on Spotify's Web API to access
        playlists from different genres, popular tracks, and artist data.
      </span>
      <button className={styles.spotifyButton} onClick={handleLogin}>
        <FaSpotify />
        <span>Continue with Spotify</span>
      </button>
    </div>
  )
}

const PageFooter = () => {
  return (
    <div className={styles.footer}>
      This project is open source and its GitHub repository can be found&nbsp;
      <a href='https://github.com/eflisback/edm-tree' target='_blank' rel='noopener noreferrer'>
        <b>here</b>
      </a>
      .
    </div>
  )
}

const Login = () => {
  return (
    <div className={styles.container}>
      <PageHeader />
      <LoginPanel />
      <PageFooter />
    </div>
  )
}

export default Login
