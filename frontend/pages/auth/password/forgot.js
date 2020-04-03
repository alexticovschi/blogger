import { useState } from 'react';
import Layout from '../../../components/Layout';
import { forgotPassword } from '../../../actions/auth';

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: '',
    message: '',
    error: '',
    showForm: true
  });

  const { email, message, error, showForm } = values;

  const handleInputChange = name => event => {
    setValues({
      ...values,
      message: '',
      error: '',
      [name]: event.target.value
    });

    console.log(event.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setValues({ ...values, message: '', error: '' });
    const data = await forgotPassword({ email });
    if (data.error) {
      setValues({
        ...values,
        message: data.message,
        email: '',
        showForm: false
      });
      setValues({ ...values, error: data.error });
    } else {
      setValues({
        ...values,
        message: data.message,
        email: '',
        showForm: false
      });
    }
  };

  const showSuccessMessage = () =>
    message ? <div className='alert alert-success'>{message}</div> : '';

  const showErrorMessage = () =>
    error ? <div className='alert alert-danger'>{error}</div> : '';

  return (
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-xl-6 col-md-8 mx-auto pt-5'>
            {showSuccessMessage()}
            {showErrorMessage()}
          </div>
          <div className='col-xl-6 col-md-8 mx-auto pt-5'>
            <h3 className='text-center pb-3'>Reset Password</h3>
            <p className='text-center pb-3'>
              Please enter your email address to request a pasword reset.
            </p>
            <form onSubmit={handleSubmit}>
              <div className='form-group pt-3'>
                <input
                  type='email'
                  onChange={handleInputChange('email')}
                  className='form-control'
                  value={email}
                  placeholder='Enter your email'
                  required
                />
              </div>
              <div>
                <button
                  type='submit'
                  className='btn btn-outline-dark btn-block'
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
