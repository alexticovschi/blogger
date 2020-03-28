import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const userProfile = username => {
  return fetch(`${API}/user/${username}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.error(err));
};
