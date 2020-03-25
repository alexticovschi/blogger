import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../../actions/auth';
import { fetchAllBlogs, removeBlog } from '../../../actions/blog';
import moment from 'moment';

const ReadBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState();
  const token = getCookie('token');

  const loadBlogs = async () => {
    const blogs = await fetchAllBlogs();
    try {
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

  const confirmAndDelete = async slug => {
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
    <div>
      {message && <div className='alert alert-warning'>{message}</div>}

      {blogs.map(blog => (
        <div className='card mt-2 pt-3 text-center' key={blog._id}>
          <div className='card-body'>
            <h5>{blog.title}</h5>
            <p>Posted by {blog.postedBy.name}</p>
            <p>Published on {moment(blog.updatedAt).fromNow()}</p>

            <button className='btn btn-info btn-sm card-link'>Update</button>
            <button
              onClick={() => confirmAndDelete(blog.slug)}
              className='btn btn-danger btn-sm card-link'
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReadBlogs;
