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

export const fetchBlogsWithCategoriesAndTags = (skip, limit) => {
  const data = {
    limit,
    skip
  };

  return fetch(`${API}/blogs-categories-tags`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    // send skip and limit data from client side to backened
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(error => console.error(error));
};
