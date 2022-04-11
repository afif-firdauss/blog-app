import React from 'react'
import Image from 'next/image'
import { Breadcrumb, Layout } from '../../../components'
import { getAllPosts, getPostDetail } from '../../../services/post';
import { dateFormat } from '../../../utils/dateFormat';

export default function ArticleDetail({data}) {
  return (
    <Layout title={`${data.title === null ? 'No Title' : data.title} - Blog App`}>
      <div className='container pt-3 pb-5'>
        <Breadcrumb/>
        <Image src='/background.jpg' width={1338} height={384} alt="Background-image"/>
        <article className='content w-100'>
          <div className='d-flex justify-content-between mb-4 mt-3'>
            <h2 className='mb-0 text-capitalize content-title'>{data.title}</h2>
            <p className='mb-0 content-text'>{dateFormat(data.published_at)}</p>
          </div>
          <p>{data.content}</p>
        </article>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const data = await getAllPosts();
  const paths = data?.map((item) => ({
    params: {
      id: item.id.toString(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({params}) {
  const { id } = params;
  const data = await getPostDetail(id);

  return { props: { data } }
}