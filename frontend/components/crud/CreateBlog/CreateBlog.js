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
  const getBlogDataFromLocalStorage = () => {
    if (typeof window === 'undefined') {
      return false;
    }

    if (localStorage.getItem('blog')) {
      return JSON.parse(localStorage.getItem('blog'));
    } else {
      return false;
    }
  };

  const [body, setBody] = useState(getBlogDataFromLocalStorage());
  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: '',
    title: '',
    hidePublishBtn: false
  });

  const { error, sizeError, success, formData, title, hidePublishBtn } = values;

  // when the component mounts, formData is ready to use
  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
  }, [router]);

  const publishBlog = e => {
    e.preventDefault();
    console.log('blog created');
  };

  // populate form data and update the state
  const handleChange = name => e => {
    console.log(e.target.value);
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    // form data to be processed by the backend to create a new blog
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: '' });
  };

  const handleBody = e => {
    // console.log(e);
    // push the event into body
    setBody(e);

    // populate form data
    formData.set('body', e);

    // save to local storage to prevent data loss on page refresh
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog', JSON.stringify(e));
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-xl-12'>
          <h1>{JSON.stringify(title)}</h1>
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
                modules={CreateBlog.modules}
                formats={CreateBlog.formats}
                value={body}
                placeholder='Write something amazing'
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

CreateBlog.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['clean'],
    ['code-block']
  ]
};

CreateBlog.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'code-block'
];

export default withRouter(CreateBlog);
