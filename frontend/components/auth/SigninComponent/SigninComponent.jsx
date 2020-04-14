import { useState, useEffect } from 'react';
import { signin, authenticate, isAuth } from '../../../actions/auth';
import { Spinner } from 'reactstrap';
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
    message: '',
    showForm: true,
  });

  const router = useRouter();

  useEffect(() => {
    isAuth() && router.push('/');
  });

  const { email, password, error, loading, message, showForm } = values;

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

  const displayError = () =>
    error ? <p className='alert alert-danger text-center'>{error}</p> : '';

  const displayMessage = () =>
    message ? <p className='alert alert-info text-center'>{message}</p> : '';

  return (
    <div className='container'>
      <section className='signin-form'>
        {loading ? (
          <Spinner
            color='secondary'
            style={{ width: '3rem', height: '3rem' }}
          />
        ) : (
          <div>
            <h2 className='signin-form__title'>Sign In</h2>
            <form onSubmit={handleSubmit}>
              <FormInput
                onChange={handleChange('email')}
                type='email'
                label='Enter email'
                value={email}
              />

              <FormInput
                onChange={handleChange('password')}
                type='password'
                label='Enter password'
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
            <div>
              <div className='col-lg-6 col-md-8 mx-auto'>
                {displayError()}
                {displayMessage()}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default SigninComponent;
