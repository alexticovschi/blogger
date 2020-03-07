import { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth, getCookie } from '../../../actions/auth';
import { createCategory } from '../../../actions/category';

const Category = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    categories: [],
    removed: false
  });

  const { name, error, success, categories, removed } = values;
  const token = getCookie('token');

  const handleSubmit = e => {
    e.preventDefault();
    createCategory({ name }, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({ ...values, error: false, success: true, name: '' });
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

  return (
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
  );
};

export default Category;
