import { useState } from 'react';
import { withRouter } from 'next/router';
import Layout from '../../../../components/Layout';
import PasswordReset from '../../../../components/auth/PasswordReset/PasswordReset';
import { resetPassword } from '../../../../actions/auth';

const ResetPassword = ({ router }) => {
  const [values, setValues] = useState({
    newPassword: '',
    message: '',
    error: '',
  });

  const { newPassword, message, error } = values;

  const handleInputChange = (value) => (event) => {
    setValues({
      ...values,
      error: '',
      [value]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, message: '', error: '' });
    const data = await resetPassword({
      newPassword,
      resetPasswordLink: router.query.token,
    });
    if (data.error) {
      setValues({
        ...values,
        error: data.error,
        newPassword: '',
      });
    } else {
      setValues({
        ...values,
        message: data.message,
        error: false,
      });
    }
  };

  const showSuccessMessage = () =>
    message ? <div className='password-reset__success'>{message}</div> : '';

  const showErrorMessage = () =>
    error ? <div className='password-reset__error'>{error}</div> : '';

  return (
    <Layout>
      <PasswordReset
        newPassword={newPassword}
        showSuccessMessage={showSuccessMessage}
        showErrorMessage={showErrorMessage}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </Layout>
  );
};

export default withRouter(ResetPassword);
