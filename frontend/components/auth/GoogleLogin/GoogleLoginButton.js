import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import GoogleLogin from 'react-google-login';
import { loginWithGoogle, authenticate, isAuth } from '../../../actions/auth';
import { GOOGLE_CLIENT_ID } from '../../../config';

const GoogleLoginButton = () => {
  const responseGoogle = async response => {
    // console.log(response);
    const { tokenId } = response;
    const login = await loginWithGoogle({ tokenId });
    console.log(login);
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
    <div className='login-with-google btn btn-block mb-4'>
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText='Login with Google'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        theme='dark'
      />
    </div>
  );
};

export default GoogleLoginButton;
