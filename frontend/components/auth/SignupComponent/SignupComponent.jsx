import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signup, preSignup, isAuth } from '../../../actions/auth';
import { toast } from 'react-toastify';
import FormInput from '../../FormInput/FormInput';
import GoogleLoginButton from '../GoogleLogin/GoogleLoginButton';
import Link from 'next/link';

import './SignupComponent.scss';

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true,
  });

  const router = useRouter();

  useEffect(() => {
    isAuth() && router.push('/');
  });

  const { name, email, password, error, loading, message } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.table(values);
    setValues({ ...values, loading: true, error: false });

    const userData = { name, email, password };

    preSignup(userData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          loading: false,
          message: data.message,
          showForm: false,
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const notifyError = () =>
    toast(<h3 className='signup-form__toast-error'>{error}</h3>, {
      type: toast.TYPE.ERROR,
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
      closeButton: false,
      hideProgressBar: true,
    });

  const notifySuccess = () => {
    toast(
      <Link href='/signin'>
        <a className='signup-form__toast-success-link'>
          <h3 className='signup-form__toast-success'>{message}</h3>
        </a>
      </Link>,
      {
        type: toast.TYPE.SUCCESS,
        position: toast.POSITION.CENTER_RIGHT,
        autoClose: 8000,
        closeButton: false,
        hideProgressBar: true,
      }
    );
    setValues({ ...values, message: '' });
  };

  return (
    <section className='signup-form'>
      <div>
        <h2 className='signup-form__title'>Join Our Blog</h2>

        <form onSubmit={handleSubmit}>
          <FormInput
            onChange={handleChange('name')}
            type='text'
            label='Name'
            value={name}
          />

          <FormInput
            onChange={handleChange('email')}
            type='email'
            label='Email'
            value={email}
          />

          <FormInput
            onChange={handleChange('password')}
            type='password'
            label='Password'
            value={password}
          />

          <button type='submit' className='signup-form__signup-btn'>
            SIGN UP
          </button>

          <div className='signup-form__signin-options'>
            <p>Or sign in with</p>
            <GoogleLoginButton />
          </div>
        </form>

        <div className='signup-form__notify-message'>
          {message ? notifySuccess() : null}
          {error ? notifyError() : null}{' '}
        </div>
      </div>
    </section>
  );
};

export default SignupComponent;
