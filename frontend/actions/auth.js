import fetch from 'isomorphic-fetch';
import { API } from '../config';
import cookie from 'js-cookie';

export const signup = user => {
  return fetch(`${API}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .catch(error => console.error(error));
};

export const signin = user => {
  return fetch(`${API}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .catch(error => console.error(error));
};

export const signout = next => {
  removeCookie('token');
  removeLocalStorage('user');
  next();

  return fetch(`${API}/signout`, {
    method: 'GET'
  })
    .then(response => console.log('Signout successful'))
    .catch(error => console.error(error));
};

// set cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1
    });
  }
};

export const removeCookie = key => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1
    });
  }
};

// get cookie
export const getCookie = key => {
  if (process.browser) {
    return cookie.get(key);
  }
};

// local storage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = key => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

// authenticate user by passing data to cookie and localstorage
export const authenticate = (data, next) => {
  // set the cookie
  setCookie('token', data.token);

  // save data to localstorage
  setLocalStorage('user', data.user);

  next();
};

export const isAuth = () => {
  if (process.browser) {
    // if there is a token in the cookie, then we have a user
    const cookieChecked = getCookie('token');

    // if there is a cookie, get the 'user' item from the local storage
    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
      } else {
        return false;
      }
    }
  }
};

export const updateUser = (user, next) => {
  if (process.browser) {
    if (localStorage.getItem('user')) {
      let auth = JSON.parse(localStorage.getItem('user'));
      auth = user;
      localStorage.setItem('user', JSON.stringify(auth));
      next();
    }
  }
};
