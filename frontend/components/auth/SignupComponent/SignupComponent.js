import { useState } from 'react';
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

  const { name, email, password, error, loading, message, showForm } = values;

  const handleSubmit = e => {
    e.preventDefault();
    console.table(values);
  };
  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  return (
    <section className='signup-form'>
      <div className='container'>
        <h2 className='title text-center'>Join Our Blog</h2>

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
    </section>
  );
};

export default SignupComponent;
