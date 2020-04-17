import { useEffect, useState } from 'react';
import { getCookie } from '../../../actions/auth';
import {
  createCategory,
  getCategories,
  deleteCategory,
} from '../../../actions/category';
import FormInput from '../../FormInput/FormInput';

import './Categories.scss';

const Categories = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, categories, removed, reload } = values;
  const token = getCookie('token');

  useEffect(() => {
    loadCategories();
  }, [reload]);

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, categories: data });
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory({ name }, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          name: '',
          removed: !removed,
          reload: !reload,
        });
      }
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
      removed: '',
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm(
      'Are you sure you want to delete this category?'
    );

    if (answer) {
      deleteCategory(slug, token).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            error: false,
            success: false,
            name: '',
            removed: !removed,
            reload: !reload,
          });
        }
      });
    }
  };

  return (
    <section className='categories'>
      <form onSubmit={handleSubmit}>
        <FormInput
          onChange={handleChange}
          label='Category name'
          value={name}
          type='text'
          required
        />

        <button type='submit' className='categories__create-category-btn'>
          Create Category
        </button>
      </form>
      <div className='categories__list'>
        {categories.map((category) => (
          <button
            onDoubleClick={() => deleteConfirm(category.slug)}
            title='Double click to delete'
            key={category._id}
            type='button'
            className='categories__list--category-btn'
          >
            {category.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;
