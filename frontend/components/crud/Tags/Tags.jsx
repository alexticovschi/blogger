import { useEffect, useState } from 'react';
import { getCookie } from '../../../actions/auth';
import { createTag, getTags, deleteTag } from '../../../actions/tag';
import FormInput from '../../FormInput/FormInput';
import './Tags.scss';

const Tags = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    tags: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, tags, removed, reload } = values;
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

  const deleteConfirm = (slug) => {
    let answer = window.confirm('Are you sure you want to delete this tag?');

    if (answer) {
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
    }
  };

  return (
    <section className='tags'>
      <form onSubmit={handleSubmit}>
        <FormInput
          onChange={handleChange}
          label='Tag name'
          value={name}
          type='text'
          required
        />
        <button type='submit' className='tags__create-tag-btn'>
          Create Tag
        </button>
      </form>
      <div className='tags__list'>
        {tags.map((tag) => (
          <button
            onDoubleClick={() => deleteConfirm(tag.slug)}
            title='Double click to delete'
            key={tag._id}
            type='button'
            className='tags__list--tag-btn'
          >
            {tag.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Tags;
