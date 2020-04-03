import { useState } from 'react';
import Layout from '../../../../components/Layout';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { resetPassword } from '../../../../actions/auth';

const ResetPassword = ({ router }) => {
  const [values, setValues] = useState({
    name: '',
    newPassword: '',
    message: '',
    error: ''
  });

  const { name, newPassword, message, error } = values;

  const handleInputChange = name => event => {
    setValues({
      ...values,
      error: '',
      [name]: event.target.value
    });

    console.log(event.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setValues({ ...values, message: '', error: '' });
    const data = await resetPassword({
      newPassword,
      resetPasswordLink: router.query.token
    });
    if (data.error) {
      setValues({
        ...values,
        error: data.error,
        newPassword: ''
      });
    } else {
      setValues({
        ...values,
        message: data.message,
        error: false
      });
    }
  };

  const showSuccessMessage = () =>
    message ? <div className='alert alert-success'>{message}</div> : '';

  const showErrorMessage = () =>
    error ? (
      <div className='alert alert-danger'>
        {error}{' '}
        <Link href='/auth/password/forgot'>
          <a>Forgot Password?</a>
        </Link>
      </div>
    ) : (
      ''
    );

  return (
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-xl-6 col-md-8 mx-auto pt-5'>
            {showSuccessMessage()}
            {showErrorMessage()}
          </div>
        </div>
        <div className='row'>
          <div className='col-xl-6 col-md-8 mx-auto pt-5'>
            <h3 className='text-center pb-3'>Reset Password</h3>
            <p className='text-center pb-3'>Please enter your new password.</p>
            <form onSubmit={handleSubmit}>
              <div className='form-group pt-3'>
                <input
                  type='password'
                  onChange={handleInputChange('newPassword')}
                  className='form-control'
                  value={newPassword}
                  placeholder='Enter your new password'
                  required
                />
              </div>
              <div>
                <button type='submit' className='btn btn-success btn-block'>
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

export default withRouter(ResetPassword);
