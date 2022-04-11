import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        <p>Copyright &copy; 2022 &minus; <span>Afif Firdaus</span></p>
      </div>
    </footer>
  )
}

export default Footer;