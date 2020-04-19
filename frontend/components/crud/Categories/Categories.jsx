import { useEffect, useState } from 'react';
import { getCookie } from '../../../actions/auth';
import {
  createCategory,
  getCategories,
  deleteCategory,
} from '../../../actions/category';
import FormInput from '../../FormInput/FormInput';
import Modal from '../../Modal/Modal';

import './Categories.scss';

const Categories = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false,
    slug: '',
  });
  const [modal, setModal] = useState(false);
  const { name, error, success, categories, removed, reload, slug } = values;
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

  const toggleModal = (slug) => {
    setModal((prevState) => !prevState);
    setValues({
      ...values,
      slug: slug,
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

  const deleteItem = (slug) => {
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

    setModal(false);
  };

  return (
    <>
      <section className='categories-crud'>
        <form onSubmit={handleSubmit}>
          <FormInput
            onChange={handleChange}
            label='Category name'
            value={name}
            type='text'
            required
          />

          <button
            type='submit'
            className='categories-crud__create-category-btn'
          >
            Create Category
          </button>
        </form>
        <div className='categories-crud__list'>
          {categories.map((category) => (
            <button
              onClick={() => toggleModal(category.slug)}
              title='Click to delete'
              key={category._id}
              type='button'
              className='categories-crud__list--category-btn'
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {modal ? (
        <div onClick={toggleModal} className='modal__back-drop'></div>
      ) : null}

      <Modal
        slug={slug}
        className='modal'
        show={modal}
        close={toggleModal}
        openModalHandler={toggleModal}
        deleteItem={deleteItem}
      >
        Are you sure you want to delete this category?
      </Modal>
    </>
  );
};

export default Categories;
