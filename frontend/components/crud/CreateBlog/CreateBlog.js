import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../../actions/auth';
import { getCategories } from '../../../actions/category';
import { getTags } from '../../../actions/tag';
import { createBlog } from '../../../actions/blog';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CreateBlog = ({ router }) => {
  const [body, setBody] = useState({});
  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: '',
    title: '',
    hidePublishBtn: false
  });

  const { error, sizeError, success, formData, title, hidePublishBtn } = values;

  const publishBlog = e => {
    e.preventDefault();
    console.log('blog created');
  };

  const handleChange = name => e => {
    console.log(e.target.value);
  };

  const handleBody = e => {
    console.log(e);
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-xl-12'>
          <form onSubmit={publishBlog}>
            <div className='form-group'>
              <label htmlFor='title'>Blog Title</label>
              <input
                type='text'
                className='form-control'
                id='title'
                placeholder='Enter title'
                onChange={handleChange('title')}
              />
            </div>
            <div className='form-group'>
              <ReactQuill
                value={body}
                placeholder='Write somethibg amazing'
                onChange={handleBody}
              />
            </div>

            <button type='submit' className='btn btn-primary'>
              PUBLISH
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CreateBlog);
