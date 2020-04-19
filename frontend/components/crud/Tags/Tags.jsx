import { useEffect, useState } from 'react';
import { getCookie } from '../../../actions/auth';
import { createTag, getTags, deleteTag } from '../../../actions/tag';
import FormInput from '../../FormInput/FormInput';
import Modal from '../../Modal/Modal';

import './Tags.scss';

const Tags = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    tags: [],
    removed: false,
    reload: false,
    slug: '',
  });
  const [modal, setModal] = useState(false);
  const { name, error, success, tags, removed, reload, slug } = values;
  const token = getCookie('token');

  useEffect(() => {
    loadTags();
  }, [reload]);

  const loadTags = () => {
    getTags().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, tags: data });
      }
    });
  };

  const toggleTagModal = (slug) => {
    setModal((prevState) => !prevState);
    setValues({
      ...values,
      slug: slug,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTag({ name }, token).then((data) => {
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
    deleteTag(slug, token).then((data) => {
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
      <section className='tags-crud'>
        <form onSubmit={handleSubmit}>
          <FormInput
            onChange={handleChange}
            label='Tag name'
            value={name}
            type='text'
            required
          />
          <button type='submit' className='tags-crud__create-tag-btn'>
            Create Tag
          </button>
        </form>
        <div className='tags-crud__list'>
          {tags.map((tag) => (
            <button
              onClick={() => toggleTagModal(tag.slug)}
              title='Click to delete'
              key={tag._id}
              type='button'
              className='tags-crud__list--tag-btn'
            >
              {tag.name}
            </button>
          ))}
        </div>
      </section>

      {modal ? (
        <div onClick={toggleTagModal} className='modal__back-drop'></div>
      ) : null}

      <Modal
        slug={slug}
        className='modal'
        show={modal}
        close={toggleTagModal}
        openModalHandler={toggleTagModal}
        deleteItem={deleteItem}
      >
        Are you sure you want to delete this tag?
      </Modal>
    </>
  );
};

export default Tags;
