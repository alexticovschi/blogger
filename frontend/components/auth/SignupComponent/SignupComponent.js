import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signup, preSignup, isAuth } from '../../../actions/auth';
import { Spinner } from 'reactstrap';
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
    showForm: true
  });

  const router = useRouter();

  useEffect(() => {
    isAuth() && router.push('/');
  });

  const { name, email, password, error, loading, message, showForm } = values;

  const handleSubmit = e => {
    e.preventDefault();
    console.table(values);
    setValues({ ...values, loading: true, error: false });

    const userData = { name, email, password };

    preSignup(userData).then(data => {
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
          showForm: false
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
    message ? (
      <p className='alert alert-info text-center'>
        <Link href='/signin'>
          <a>{message}</a>
        </Link>
      </p>
    ) : (
      ''
    );

  return (
    <section className='signup-form'>
      {loading ? (
        <Spinner color='secondary' style={{ width: '3rem', height: '3rem' }} />
      ) : (
        <div className='container'>
          <h2 className='title text-center'>Join Our Blog</h2>
          <div className='row'>
            <div className='col-lg-6 col-md-8 mx-auto'>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='name'>Name:</label>
                  <input
                    onChange={handleChange('name')}
                    type='text'
                    className='form-control'
                    placeholder='Enter name'
                    id='name'
                    value={name}
                  />
                </div>
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
                  SIGN UP
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

export default SignupComponent;
