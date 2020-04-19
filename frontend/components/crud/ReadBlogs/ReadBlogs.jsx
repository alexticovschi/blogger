import { useState, useEffect } from 'react';
import { getCookie, isAuth } from '../../../actions/auth';
import { fetchAllBlogs, removeBlog } from '../../../actions/blog';
import ReadBlogCard from '../ReadBlogCard/ReadBlogCard';
import './ReadBlogs.scss';

const ReadBlogs = ({ username }) => {
  console.log(username);
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState();
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
    console.log('MESSAGE:', message);
  }, []);

  const confirmAndDelete = async (slug) => {
    let answer = window.confirm('Are you sure you want to delete this blog?');

    if (answer) {
      let blog;
      try {
        blog = await removeBlog(slug, token);
        setMessage(blog.message);
        loadBlogs();
      } catch (error) {
        console.error(blog.error);
      }
    }
  };

  return (
    <div className='read-blogs'>
      {message && <div className='alert alert-warning'>{message}</div>}

      <div className='read-blogs__banner'>
        <h4 className='read-blogs__title'>Manage Blogs</h4>
      </div>

      {blogs.map((blog) => (
        <ReadBlogCard
          blog={blog}
          isAuth={isAuth}
          confirmAndDelete={confirmAndDelete}
        />
      ))}
    </div>
  );
};

export default ReadBlogs;
