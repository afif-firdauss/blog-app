import { Breadcrumb, Layout } from '../../components'
import { createArticle } from '../../services/post';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';

export default function PostArticle() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleContentChange = (e) => {
    setContent(e.target.value);
  }

  const submitForm = async () => {
    if (title.trim() !== '' && content.trim() !== '') {
      const params = {
        "title": title,
        "content": content,
        };

      setLoading(true);
      await createArticle(params)
      setLoading(false);
      toast.success('Success create an article', {autoClose: 3000})
      setTitle('');
      setContent('');
    } else if (title.trim() === '') {
      toast.error('Title cannot be empty', {autoClose: 3000})
    } else if (content.trim() === '') {
      toast.error('Content cannot be empty', {autoClose: 3000})
    }
  };

  return (
    <Layout title='Post Article - Blog App'>
      <ToastContainer position='top-right' autoClose={3000} pauseOnHover />
      <div className='container mt-4'>
        <Breadcrumb/>
        <h2 className='fw-bold mb-4'>Post Article</h2>
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
                  ) : 'Post'
                }
              </Button>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  )
}