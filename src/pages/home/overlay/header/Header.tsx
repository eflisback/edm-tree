import { FaCodeBranch, FaGithub } from 'react-icons/fa6'
import styles from './Header.module.scss'
import { ReactElement } from 'react'
import Icon from '../../../../components/icon/Icon'
// import { useGenreTreeStore } from '../../../../store/genreTreeStore'
// import { FaCompactDisc } from 'react-icons/fa6'

interface Link {
  icon: ReactElement
  href: string
  title: string
}

const links: Link[] = [
  { icon: <FaCodeBranch />, href: 'https://github.com/eflisback/edm-tree', title: 'Source code' },
  { icon: <FaGithub />, href: 'https://github.com/eflisback', title: 'My GitHub profile' },
]

const Header = () => {
  // const { selectedGenre } = useGenreTreeStore()

  return (
    <header className={styles.header}>
      <section className={styles.logo}>
        <Icon />
        <span>
          EDM Tree,
          <span className={styles.credit}>
            {' '}
            by <span className={styles.gradient}>eflisback</span>
          </span>
        </span>
      </section>
      {/* <section className={styles.nowExploring}>
        {selectedGenre ? (
          <div className={styles.panel}>
            <FaCompactDisc />
            <span>{selectedGenre.title}</span>
          </div>
        ) : (
          ''
        )}
      </section> */}
      <section className={styles.links}>
        {links.map((link, i) => (
          <a title={link.title} key={i} href={link.href} target='_blank' rel='noopener noreferrer'>
            {link.icon}
          </a>
        ))}
      </section>
    </header>
  )
}

export default Header
