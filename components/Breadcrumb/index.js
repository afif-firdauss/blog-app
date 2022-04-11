/* eslint-disable @next/next/link-passhref */
import Link from 'next/link';
import Image from 'next/image';

export default function Breadcrumb() {
  return (
    <Link href="/">
      <div className='breadcrumb'>
        <Image src="/icon-24-px-arrow-left.svg" width={20} height={20} className="mr-2" alt="arrow"/>
        <p>Go Back</p>
      </div>
    </Link>
  )
}
