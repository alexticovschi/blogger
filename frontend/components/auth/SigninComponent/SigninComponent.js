import { useState } from 'react';
import { signin, authenticate } from '../../../actions/auth';
import { Spinner } from 'reactstrap';
import { useRouter } from 'next/router';

import './SigninComponent.scss';

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true
  });

  const router = useRouter();

  const { email, password, error, loading, message, showForm } = values;

  const handleSubmit = e => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });

    const userData = { email, password };

    signin(userData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // store token in cookie
        // save userinfo to localstorage
        // authenticate user
        authenticate(data, () => {
          router.push('/');
        });
      }
    });
  };

  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const displayError = () =>
    error ? <p className='alert alert-danger text-center'>{error}</p> : '';

  const displayMessage = () =>
    message ? <p className='alert alert-info text-center'>{message}</p> : '';

  return (
    <section className='signin-form'>
      {loading ? (
        <Spinner color='secondary' style={{ width: '3rem', height: '3rem' }} />
      ) : (
        <div className='container'>
          <h2 className='title text-center'>Sign In</h2>
          <div className='row'>
            <div className='col-lg-6 col-md-8 mx-auto'>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='email'>Email address:</label>
                  <input
                    onChange={handleChange('email')}
                    type='email'
                    className='form-control'
                    placeholder='Enter email'
                    id='email'
                    value={email}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='pwd'>Password:</label>
                  <input
                    onChange={handleChange('password')}
                    type='password'
                    className='form-control'
                    placeholder='Enter password'
                    id='pwd'
                    value={password}
                  />
                </div>

                <button type='submit' className='btn signup-btn btn-block'>
                  SIGN IN
                </button>
              </form>
            </div>
          </div>
          <div className='row mt-5'>
            <div className='col-lg-6 col-md-8 mx-auto'>
              {displayError()}
              {displayMessage()}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SigninComponent;
