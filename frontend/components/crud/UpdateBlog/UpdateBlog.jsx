import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../../actions/auth';
import { getCategories } from '../../../actions/category';
import { getTags } from '../../../actions/tag';
import { fetchBlog, updateBlog } from '../../../actions/blog';
import { API } from '../../../config';
import FormInput from '../../FormInput/FormInput';

import './UpdateBlog.scss';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const UpdateBlog = ({ router }) => {
  const [body, setBody] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);
  const [values, setValues] = useState({
    error: '',
    success: '',
    formData: '',
    title: '',
    body: '',
  });

  const token = getCookie('token');
  const { slug } = router.query;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initBlog();
    initCategories();
    initTags();
  }, [router]);

  const { error, success, formData, title } = values;

  const initBlog = async () => {
    try {
      let blog = await fetchBlog(slug);
      if (blog) {
        setValues({ ...values, title: blog.title });
        setBody(blog.body);
        setCategoriesArray(blog.categories);
        setTagsArray(blog.tags);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setCategoriesArray = (categories) => {
    let categoriesArray = [];
    categories.map((category) => categoriesArray.push(category._id));
    setCheckedCategories(categoriesArray);
  };

  const setTagsArray = (tags) => {
    let tagsArray = [];
    tags.map((tag) => tagsArray.push(tag._id));
    setCheckedTags(tagsArray);
  };

  const checkCategoriesAndTags = (arr, id) => {
    return arr.indexOf(id) === -1 ? false : true;
  };

  // initialize categories state
  const initCategories = async () => {
    try {
      let categories = await getCategories();
      if (categories) {
        setCategories(categories);
      }
    } catch (error) {
      setValues({ ...values, error: categories.error });
      console.error(error);
    }
  };

  // initialize tags state
  const initTags = async () => {
    try {
      let tags = await getTags();
      if (tags) {
        setTags(tags);
      }
    } catch (error) {
      setValues({ ...values, error: tags.error });
      console.error(error);
    }
  };

  const handleChange = (name) => (e) => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    // form data to be processed by the backend to create a new blog
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: '' });
  };

  // add or remove checked categories from state
  const handleCategoryToggleCheckbox = (categoryId) => () => {
    setValues({ ...values, error: '' });

    const allCheckedCategories = [...checkedCategories];

    // get the index of current checked category
    const checkedCategory = checkedCategories.indexOf(categoryId);

    // if the current checked category is not in the state, add it
    // else remove the category from the state
    if (checkedCategory === -1) {
      allCheckedCategories.push(categoryId);
    } else {
      allCheckedCategories.splice(checkedCategory, 1);
    }

    setCheckedCategories(allCheckedCategories);
    formData.set('categories', allCheckedCategories);
  };

  // add or remove checked tags from state
  const handleTagToggleCheckbox = (tagId) => () => {
    setValues({ ...values, error: '' });

    const allCheckedTags = [...checkedTags];

    // get the index of current checked tag
    const checkedTag = checkedTags.indexOf(tagId);

    // if the current checked tag is not in the state, add it
    // else remove the tag from the state
    if (checkedTag === -1) {
      allCheckedTags.push(tagId);
    } else {
      allCheckedTags.splice(checkedTag, 1);
    }

    setCheckedTags(allCheckedTags);
    formData.set('tags', allCheckedTags);
  };

  const handleBody = (event) => {
    setBody(event);
    // whenever a user is making a change, that change will be save into 'formData.body'
    formData.set('body', event);
  };

  const editBlog = async (event) => {
    event.preventDefault();

    let updatedBlog;
    try {
      updatedBlog = await updateBlog(formData, token, slug);
      setValues({ ...values, title: '', success: 'Update Successful!' });

      if (isAuth() && isAuth().role === 1) {
        // if authenticated and admin
        Router.replace(`/admin/crud/${slug}`); // redirect
      } else if (isAuth() && isAuth().role === 0) {
        // if authenticated and user
        Router.replace(`/user/crud/${slug}`); // redirect
      }
    } catch (error) {
      console.error(error);
      setValues({ ...values, error: updatedBlog.error });
    }
  };

  return (
    <div className='update-blog'>
      <h4 className='update-blog__title'>Update blog</h4>

      <div className='update-blog__wrapper'>
        <form onSubmit={editBlog}>
          <FormInput
            type='text'
            value={title}
            label='Blog Title'
            onChange={handleChange('title')}
            required
          />
          <div className='form-group'>
            <ReactQuill
              modules={UpdateBlog.modules}
              formats={UpdateBlog.formats}
              bounds={'.quill'}
              value={body}
              placeholder='Write something amazing...'
              onChange={handleBody}
            />
          </div>

          <button type='submit' className='update-blog__publish-btn'>
            UPDATE BLOG
          </button>
        </form>

        <div>
          <div className='form-group'>
            <h5>Featured Image</h5>

            <label className='update-blog__upload-img-btn'>
              Upload Image
              <input
                onChange={handleChange('photo')}
                type='file'
                accept='image/*'
                hidden
              />
            </label>
            <small className='update-blog__img-size-info'>Max Size: 1MB</small>
          </div>

          {body && (
            <img
              className='update-blog__img'
              src={`${API}/blog/photo/${slug}`}
              alt={title}
            />
          )}

          <div>
            <div className='update-blog__categories'>
              <h5>Categories</h5>
              <ul style={{ maxHeight: '120px', overflowY: 'scroll' }}>
                {categories &&
                  categories.map((category) => (
                    <li key={category._id}>
                      <input
                        checked={checkCategoriesAndTags(
                          checkedCategories,
                          category._id
                        )}
                        onChange={handleCategoryToggleCheckbox(category._id)}
                        type='checkbox'
                      />
                      <label className='form-check-label'>
                        {category.name}
                      </label>
                    </li>
                  ))}
              </ul>
            </div>
            <div className='update-blog__tags'>
              <h5>Tags</h5>
              <ul style={{ maxHeight: '120px', overflowY: 'scroll' }}>
                {tags &&
                  tags.map((tag) => (
                    <li key={tag._id}>
                      <input
                        checked={checkCategoriesAndTags(checkedTags, tag._id)}
                        onChange={handleTagToggleCheckbox(tag._id)}
                        type='checkbox'
                      />
                      <label className='form-check-label'>{tag.name}</label>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UpdateBlog.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['clean'],
    ['code-block'],
  ],
};

UpdateBlog.formats = [
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
  'code-block',
];

export default withRouter(UpdateBlog);
