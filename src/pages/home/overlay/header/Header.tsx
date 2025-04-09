import { MdEqualizer } from 'react-icons/md'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <section className={styles.logo}>
        <MdEqualizer />
        <span>
          EDM Tree,
          <span className={styles.credit}>
            {' '}
            by <span className={styles.gradient}>eflisback</span>
          </span>
        </span>
      </section>
      <section className={styles.links}>{/* TODO */}</section>
    </header>
  )
}

export default Header
