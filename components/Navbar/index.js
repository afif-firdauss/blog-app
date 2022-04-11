/* eslint-disable @next/next/link-passhref */
import Link from 'next/link';
import styles from './Navbar.module.css'

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <div className='container justify-content-between align-items-center d-flex flex-wrap'>
        <div className='d-flex align-items-end'>
          <h1 className={styles.linkTo}>BlogApp</h1>
        </div>
        <Link href="/article/post"><p className={styles.link}>Post Article</p></Link>
      </div>
    </header>
  )
}

export default Navbar;