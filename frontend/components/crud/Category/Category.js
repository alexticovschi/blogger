import { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth, getCookie } from '../../../actions/auth';
import {
  createCategory,
  getCategories,
  deleteCategory
} from '../../../actions/category';

const Category = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false
  });

  const { name, error, success, categories, removed, reload } = values;
  const token = getCookie('token');

  useEffect(() => {
    loadCategories();
  }, [reload]);

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, categories: data });
      }
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    createCategory({ name }, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          name: '',
          removed: !removed,
          reload: !reload
        });
      }
    });
  };

  const handleChange = e => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
      removed: ''
    });
  };

  const deleteConfirm = slug => {
    let answer = window.confirm(
      'Are you sure you want to delete this category?'
    );

    if (answer) {
      deleteCategory(slug, token).then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            error: false,
            success: false,
            name: '',
            removed: !removed,
            reload: !reload
          });
        }
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='inputName'>Name</label>
          <input
            onChange={handleChange}
            value={name}
            type='text'
            className='form-control'
            id='inputName'
            placeholder='Enter name'
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Create Category
        </button>
      </form>
      <div className='mt-4'>
        {categories.map(category => (
          <button
            onDoubleClick={() => deleteConfirm(category.slug)}
            title='Double click to delete'
            key={category._id}
            type='button'
            className='btn btn-outline-primary mr-1 mt-2'
            data-toggle='modal'
            data-target='#exampleModalCenter'
          >
            {category.name}
          </button>
        ))}

        <div
          class='modal fade'
          id='exampleModalCenter'
          tabindex='-1'
          role='dialog'
          aria-labelledby='exampleModalCenterTitle'
          aria-hidden='true'
        >
          <div class='modal-dialog modal-dialog-centered' role='document'>
            <div class='modal-content'>
              <div class='modal-header'>
                <h5 class='modal-title' id='exampleModalLongTitle'>
                  Modal title
                </h5>
                <button
                  type='button'
                  class='close'
                  data-dismiss='modal'
                  aria-label='Close'
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div class='modal-body'>...</div>
              <div class='modal-footer'>
                <button
                  type='button'
                  class='btn btn-secondary'
                  data-dismiss='modal'
                >
                  Close
                </button>
                <button type='button' class='btn btn-primary'>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
