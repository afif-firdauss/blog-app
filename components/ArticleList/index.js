import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import { ToastContainer, toast } from 'react-toastify'
import { deletePost } from '../../services/post'
import { dateFormat } from '../../utils/dateFormat'

export default function ArticleList({data}) {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const idRef = useRef();
  const titleRef = useRef();

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    idRef.current = id;
    titleRef.current = data.find(item => item.id === id).title;
  };

  const handleDelete = async (id) => {
    setShow(false)
    await deletePost(id);
    router.reload(window.location.pathname)
    toast.success('Success delete article', {autoClose: 3000})
  }

  return (
    <>
      <ToastContainer position='top-right' autoClose={3000} pauseOnHover />
      <div className='article-wrapper container'>
        {
          data?.map(article => {
            return (
              <article className='article-card' key={article.id}>
                <Card className='article-container'>
                  <Card.Img variant="left" src="./no-image.png" />
                  <Card.Body>
                    <Card.Title className='fw-bold text-capitalize line-clam-one'>{article.title === null ? 'No Title' : article.title}</Card.Title>
                    <Card.Text className='line-clam'>
                      {article.content}
                    </Card.Text>
                    <Card.Text className='text-muted'>
                      Posted on {dateFormat(article.published_at)}
                    </Card.Text>
                    <Button variant="primary" onClick={() => router.push(`/article/detail/${article.id}`)}>Read more</Button>{' '}
                    <Button variant="warning" onClick={() => router.push(`/article/update/${article.id}`)}>Update</Button>{' '}
                    <Button variant="danger" onClick={() => handleShow(article.id)}>Delete</Button>
                  </Card.Body>
                </Card>
              </article>
            )
          })
        }
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Article</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure to delete <span className='fw-bold'>{titleRef.current}</span>?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button variant="primary" onClick={() => handleDelete(idRef.current)}>Yes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}
