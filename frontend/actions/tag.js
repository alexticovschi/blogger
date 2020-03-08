import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const createTag = (category, token) => {
  return fetch(`${API}/tag`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(response => response.json())
    .catch(error => console.error(error));
};

export const getTags = () => {
  return fetch(`${API}/tags`, {
    method: 'GET'
  })
    .then(response => response.json())
    .catch(error => console.error(error));
};

export const getTag = slug => {
  return fetch(`${API}/tag/${slug}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .catch(error => console.error(error));
};

export const deleteTag = (slug, token) => {
  return fetch(`${API}/tag/${slug}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .catch(error => console.error(error));
};
