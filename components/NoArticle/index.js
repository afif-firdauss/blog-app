import Image from 'next/image'
import styles from './NoArticle.module.css'

export default function NoArtikel() {
  return (
    <div className={styles.container}>
      <Image src="/no-results.png" width={51} height={101} alt="No Article"/>
      <h4>No Artikel</h4>
    </div>
  )
}
