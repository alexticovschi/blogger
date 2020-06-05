import { useState, useEffect } from 'react';
import { getCookie, isAuth } from '../../../actions/auth';
import { fetchAllBlogs, removeBlog } from '../../../actions/blog';
import ReadBlogCard from '../ReadBlogCard/ReadBlogCard';
import Modal from '../../Modal/Modal';
import { toast } from 'react-toastify';

import './ReadBlogs.scss';

const ReadBlogs = ({ username }) => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState();
  const [modal, setModal] = useState(false);
  const [slug, setSlug] = useState('');
  const token = getCookie('token');

  const loadBlogs = async () => {
    let blogs;
    try {
      blogs = await fetchAllBlogs(username);
      if (blogs) {
        setBlogs(blogs);
      }
    } catch (error) {
      console.log(blogs.error);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const toggleModal = (slug) => {
    setModal((prevState) => !prevState);
    setSlug(slug);
  };

  const deleteBlog = async (slug) => {
    let blog;
    try {
      blog = await removeBlog(slug, token);
      setMessage(blog.message);
      loadBlogs();
    } catch (error) {
      console.error(blog.error);
    }
    setModal(false);
  };

  const notifySuccess = () => {
    toast(<h3 className='toast-success'>{message}</h3>, {
      type: toast.TYPE.SUCCESS,
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
      closeButton: false,
      hideProgressBar: true,
    });
    setMessage('');
  };

  return (
    <>
      <div className='read-blogs'>
        <div className='read-blogs__banner'>
          <h4 className='read-blogs__title'>Manage Blogs</h4>
        </div>

        {blogs.map((blog) => (
          <ReadBlogCard blog={blog} isAuth={isAuth} toggleModal={toggleModal} />
        ))}
      </div>

      {modal ? (
        <div onClick={toggleModal} className='modal__back-drop'></div>
      ) : null}

      <Modal
        text='Delete Blog'
        slug={slug}
        showModal={modal}
        close={toggleModal}
        deleteItem={() => deleteBlog(slug)}
      >
        Are you sure you want to delete this blog?
      </Modal>

      <div className='notify-message'>{message ? notifySuccess() : null}</div>
    </>
  );
};

export default ReadBlogs;
