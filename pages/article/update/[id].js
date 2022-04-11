import { Breadcrumb, Layout } from '../../../components'
import { getAllPosts, getPostDetail, updatePost } from '../../../services/post';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';

export default function UpdateArticle({data}) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleContentChange = (e) => {
    setContent(e.target.value);
  }

  const submitForm = async () => {
    if (title !== data.title && title !== '' && content !== '' || content !== data.content && content !== '' && title !== '') {
      const params = {
        "title": title,
        "content": content,
        };

      setLoading(true);
      await updatePost(data.id, params);
      setLoading(false);
      toast.success('Success update article', {autoClose: 3000})
    } else if (title === "") {
      toast.error('Title cannot be empty', {autoClose: 3000})
    } else if (content === "") {
      toast.error('Content cannot be empty', {autoClose: 3000})
    } else {
      toast.error('Nothing change, please update', {autoClose: 3000})
    }
  };

  return (
    <Layout title={`${data.title === null ? 'No Title' : data.title} - Blog App`}>
      <ToastContainer position='top-right' autoClose={3000} pauseOnHover />
      <div className='container mt-4'>
        <Breadcrumb/>
        <h2 className='fw-bold mb-4'>Update Post</h2>
        <article className='content'>
          <div className='d-flex justify-content-between mb-4 mt-3'>
            <div className='d-flex flex-column w-100'>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Post title" value={title} onChange={handleTitleChange}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Write content here"
                  style={{ height: '140px' }}
                  value={content}
                  onChange={handleContentChange}
                />
              </Form.Group>
              <Button className='mt-3' variant="primary" type="submit" onClick={submitForm}>
                {
                  loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : 'Update'
                }
              </Button>
            </div>
          </div>
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