import { useState, useEffect } from 'react';
import { signin, authenticate, isAuth } from '../../../actions/auth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link';
import GoogleLoginButton from '../GoogleLogin/GoogleLoginButton';
import FormInput from '../../FormInput/FormInput';

import './SigninComponent.scss';

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    showForm: true,
  });

  const { email, password, error, loading } = values;
  const router = useRouter();

  useEffect(() => {
    isAuth() && router.push('/');
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });

    const userData = { email, password };

    signin(userData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // store token in cookie
        // save userinfo to localstorage
        // authenticate user
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            router.push('/admin');
          } else {
            router.push('/user');
          }
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const notify = () =>
    toast(<h3 className='signin-form__toast'>{error}</h3>, {
      type: toast.TYPE.ERROR,
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 56000,
      closeButton: false,
      hideProgressBar: true,
    });

  return (
    <section className='signin-form'>
      <div>
        <h2 className='signin-form__title'>Sign In</h2>
        <form onSubmit={handleSubmit}>
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

          <button type='submit' className='signin-form__signin-btn'>
            SIGN IN
          </button>

          <div className='signin-form__signin-options'>
            <p>Or sign in with</p>
            <GoogleLoginButton />
          </div>
          <div className='signin-form__forgot-password'>
            <Link href='/auth/password/forgot'>
              <a className='signin-form__forgot-password--link'>
                Forgot Password?
              </a>
            </Link>
          </div>
        </form>
        <div className='signin-form__notify-message'>
          {error ? notify() : null}
        </div>
      </div>
    </section>
  );
};

export default SigninComponent;
