import { useState, useEffect } from 'react';
import { getCookie, updateUser } from '../../../actions/auth';
import { getProfile, updateProfile } from '../../../actions/user';
import { API } from '../../../config';
import FormInput from '../../FormInput/FormInput';
import TextareaInput from '../../ContactForm/TextareaInput/TextareaInput';
import { toast } from 'react-toastify';

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
      photo: `${API}/user/photo/${username}`,
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

  const notifyError = () => {
    toast(<h3 className='toast-error'>{error}</h3>, {
      type: toast.TYPE.ERROR,
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
      closeButton: false,
      hideProgressBar: true,
    });
    setValues({ ...values, error: false });
  };

  const notifySuccess = () => {
    toast(<h3 className='toast-success'>Profile updated</h3>, {
      type: toast.TYPE.SUCCESS,
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
      closeButton: false,
      hideProgressBar: true,
    });
    setValues({ ...values, success: false });
  };

  return (
    <div className='profile-update'>
      <div className='profile-update__img-wrapper'>
        <img
          className='profile-update__img'
          src={`${API}/user/photo/${username}`}
          alt='user profile'
        />

        <div className='profile-update__profile-photo-btn'>
          <label className='profile-update__profile-photo-btn__label'>
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
        <form onSubmit={handleSubmit}>
          <FormInput
            label='Name'
            onChange={handleChange('name')}
            type='text'
            value={name}
          />

          <FormInput
            label='Email'
            onChange={handleChange('email')}
            type='text'
            value={email}
          />

          <TextareaInput
            type='text'
            label='About'
            value={about || ''}
            onChange={handleChange('about')}
            rows='10'
            required
          />

          <FormInput
            label='Password'
            onChange={handleChange('password')}
            type='password'
            value={password}
          />

          <button type='submit' className='profile-update__btn'>
            Update Profile
          </button>
        </form>
      </div>

      <div className='notify-message'>
        {success ? notifySuccess() : null}
        {error ? notifyError() : null}
      </div>
    </div>
  );
};

export default ProfileUpdate;
