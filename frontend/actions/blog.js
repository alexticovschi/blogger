import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const createBlog = (blog, token) => {
  return fetch(`${API}/blog`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: blog
  })
    .then(response => response.json())
    .catch(error => console.error(error));
};

export const fetchBlogsWithCategoriesAndTags = () => {
  return fetch(`${API}/blogs-categories-tags`, {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    }
  })
    .then(response => response.json())
    .catch(error => console.error(error));
};
