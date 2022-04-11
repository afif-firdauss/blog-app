import { ArticleList, Layout, NoArticle } from '../components';
import { getAllPosts } from '../services/post';

export default function Home({data}) {
  return (
    <Layout title="Home - Blog App">
      {
        data.length > 0 ? (
          <ArticleList data={data}/>
        ) : (
          <NoArticle/>
        )
      }
    </Layout>
  )
}

export async function getServerSideProps() {
  const data = await getAllPosts();

  return { props: { data } }
}