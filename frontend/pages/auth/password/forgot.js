import { useState } from 'react';
import Layout from '../../../components/Layout';
import ForgotPassword from '../../../components/auth/ForgotPassword/ForgotPassword';
import { forgotPassword } from '../../../actions/auth';

const ForgotPage = () => {
  const [values, setValues] = useState({
    email: '',
    message: '',
    error: '',
    showForm: true,
  });

  const { email, message, error } = values;

  const handleInputChange = (name) => (event) => {
    setValues({
      ...values,
      message: '',
      error: '',
      [name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, message: '', error: '' });
    const data = await forgotPassword({ email });
    if (data.error) {
      setValues({ ...values, error: data.error });
    } else {
      setValues({
        ...values,
        message: data.message,
        email: '',
        showForm: false,
      });
    }
  };

  const showSuccessMessage = () =>
    message ? <div className='forgot-password__success'>{message}</div> : '';

  const showErrorMessage = () =>
    error ? <div className='forgot-password__error'>{error}</div> : '';

  return (
    <Layout>
      <ForgotPassword
        email={email}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        showSuccessMessage={showSuccessMessage}
        showErrorMessage={showErrorMessage}
      />
    </Layout>
  );
};

export default ForgotPage;
