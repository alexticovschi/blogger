import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCookie, updateUser } from '../../../actions/auth';
import { getProfile, updateProfile } from '../../../actions/user';
import { API } from '../../../config';
import FormInput from '../../FormInput/FormInput';
import TextareaInput from '../../ContactForm/TextareaInput/TextareaInput';

import './ProfileUpdate.scss';

const ProfileUpdate = () => {
  const [values, setValues] = useState({
    username: '',
    name: '',
    email: '',
    about: '',
    password: '',
    error: '',
    success: '',
    loading: '',
    photo: '',
    userData: '',
  });

  const token = getCookie('token');
  const {
    username,
    name,
    email,
    about,
    password,
    error,
    success,
    loading,
    photo,
    userData,
  } = values;

  const initProfile = async () => {
    const response = await getProfile(token);

    try {
      if (response) {
        setValues({
          ...values,
          username: response.username,
          name: response.name,
          email: response.email,
          about: response.about,
        });
      }
    } catch (error) {
      setValues({ ...values, error: response.error });
      console.error(response);
    }
  };

  useEffect(() => {
    initProfile();
  }, []);

  // populate form data and update the state
  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    // form data to be processed by the backend to update profile
    let userFormData = new FormData();
    userFormData.set(name, value);
    setValues({
      ...values,
      [name]: value,
      userData: userFormData,
      error: false,
      success: false,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true });
    const updatedUser = await updateProfile(userData, token);

    try {
      if (updatedUser) {
        updateUser(updatedUser, () => {
          setValues({
            ...values,
            username: updatedUser.username,
            name: updatedUser.name,
            email: updatedUser.email,
            about: updatedUser.about,
            success: true,
            loading: false,
          });
        });
      }
    } catch (error) {
      setValues({
        ...values,
        error: updatedUser.error,
        success: false,
        loading: true,
      });
      console.error(updatedUser.error);
    }
  };

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className='alert alert-success'
      style={{ display: success ? '' : 'none' }}
    >
      Profile updated
    </div>
  );

  const showLoading = () => (
    <div
      className='alert alert-info'
      style={{ display: loading ? '' : 'none' }}
    >
      Loading...
    </div>
  );

  return (
    <div className='profile-update'>
      <div className='profile-update__img-wrapper'>
        <img
          className='profile-update__img'
          src={`${API}/user/photo/${username}`}
          alt='user profile'
        />

        <div className='profile-update__profile-photo-btn'>
          <label
            htmFor='photo'
            className='profile-update__profile-photo-btn__label'
          >
            Profile Photo
            <input
              onChange={handleChange('photo')}
              type='file'
              accept='image/*'
              id='photo'
              hidden
            />
          </label>
        </div>
      </div>
      <div className='profile-update__data'>
        {showSuccess()}
        {showError()}
        {showLoading()}
        <form onSubmit={handleSubmit}>
          <FormInput
            label='Username'
            onChange={handleChange('username')}
            type='text'
            value={username}
          />

          <FormInput
            label='Name'
            onChange={handleChange('name')}
            type='text'
            value={name}
          />
          {/* <div className='form-group'>
            <label className='text-muted'>About</label>
            <textarea
              onChange={handleChange('about')}
              type='about'
              value={about}
              className='form-control'
            />
          </div> */}
          <TextareaInput
            type='text'
            label='About'
            value={about}
            onChange={handleChange('about')}
            rows='10'
            required
          />

          <FormInput
            label='Password'
            onChange={handleChange('password')}
            type='text'
            value={password}
          />

          {/* <div className='form-group'>
            <label className='text-muted'>Username</label>
            <input
              onChange={handleChange('username')}
              type='text'
              value={username}
              className='form-control'
            />
          </div>
          <div className='form-group'>
            <label className='text-muted'>Name</label>
            <input
              onChange={handleChange('name')}
              type='text'
              value={name}
              className='form-control'
            />
          </div>
          <div className='form-group'>
            <label className='text-muted'>Email</label>
            <input
              onChange={handleChange('email')}
              type='email'
              value={email}
              className='form-control'
            />
          </div> */}

          {/* <div className='form-group'>
            <label className='text-muted'>Password</label>
            <input
              onChange={handleChange('password')}
              type='password'
              value={password}
              className='form-control'
            />
          </div> */}
          <button type='submit' className='profile-update__btn'>
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
