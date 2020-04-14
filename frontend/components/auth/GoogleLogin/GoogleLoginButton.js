import Router from 'next/router';
import GoogleLogin from 'react-google-login';
import { loginWithGoogle, authenticate, isAuth } from '../../../actions/auth';
import { GOOGLE_CLIENT_ID } from '../../../config';

const GoogleLoginButton = () => {
  const responseGoogle = async (response) => {
    const { tokenId } = response;
    const login = await loginWithGoogle({ tokenId });

    if (login.error) {
      console.log(login.error);
    } else {
      await authenticate(login, () => {
        if (isAuth() && isAuth().role === 1) {
          Router.push('/admin');
        } else {
          Router.push('/user');
        }
      });
    }
  };

  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      buttonText='Sign in with Google'
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      theme='dark'
    />
  );
};

export default GoogleLoginButton;
