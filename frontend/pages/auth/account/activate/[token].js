import { useState, useEffect } from 'react';
import Layout from '../../../../components/Layout';
import ActivateAccount from '../../../../components/auth/ActivateAccount/ActivateAccount';
import { withRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import { signup } from '../../../../actions/auth';

const Activate = ({ router }) => {
  const [values, setValues] = useState({
    name: '',
    token: '',
    error: '',
    loading: false,
    success: false,
    newPassword: '',
    showButton: true,
  });

  const { name, token, error, loading, success, showButton } = values;

  useEffect(() => {
    let { token } = router.query;

    if (token) {
      const { name } = jwt.decode(token);
      setValues({ ...values, name, token });
    }
  }, [router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: false });

    const signup_user = await signup({ token });

    if (signup_user.error) {
      setValues({
        ...values,
        error: signup_user.error,
        loading: false,
        showButton: false,
      });
    } else {
      setValues({
        ...values,
        loading: false,
        success: true,
        showButton: false,
      });
    }
  };

  const showLoading = () =>
    loading ? <h4 className='text-center'>Loading...</h4> : '';

  return (
    <Layout>
      <ActivateAccount
        name={name}
        handleSubmit={handleSubmit}
        showLoading={showLoading}
        success={success}
        showButton={showButton}
        error={error}
      />
    </Layout>
  );
};

export default withRouter(Activate);
