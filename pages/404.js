/* eslint-disable @next/next/link-passhref */
import { Layout } from '../components';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout title="Page Not Found - Blog App">
      <div className="not-found d-flex justify-content-center align-items-center text-center flex-column">
        <h2>404<br/><span>Not Found</span></h2>
        <Link href="/" ><p className="not-found-link">Back to Home</p></Link>
      </div>
    </Layout>
  )
}