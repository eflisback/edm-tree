import { MdEqualizer } from 'react-icons/md'
import styles from './Header.module.scss'

const Header = () => {
    return (
        <div className={styles.outer}>
            <div className={styles.inner}>
                <section className={styles.logo}>
                    <MdEqualizer />
                    <span>EDM Tree</span>
                </section>
            </div>
        </div>
    )
}

export default Header