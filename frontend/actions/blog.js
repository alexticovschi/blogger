import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth } from './auth';

export const createBlog = (blog, token) => {
  let createBlogEndpoint;

  if (isAuth() && isAuth().role === 1) {
    createBlogEndpoint = `${API}/blog`;
  } else if (isAuth() && isAuth().role === 0) {
    createBlogEndpoint = `${API}/user/blog`;
  }

  return fetch(createBlogEndpoint, {
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

export const fetchBlog = slug => {
  return fetch(`${API}/blog/${slug}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .catch(error => console.error(error));
};

export const fetchRelatedBlogs = blog => {
  return fetch(`${API}/blogs/related`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(blog)
  })
    .then(response => response.json())
    .catch(error => console.error(error));
};

export const fetchAllBlogs = username => {
  let getBlogsEndpoint;

  if (username) {
    getBlogsEndpoint = `${API}/${username}/blogs`;
  } else {
    getBlogsEndpoint = `${API}/blogs`;
  }

  return fetch(getBlogsEndpoint, {
    method: 'GET'
  })
    .then(response => response.json())
    .catch(error => console.error(error));
};

export const updateBlog = (blog, token, slug) => {
  let updateBlogEndpoint;

  if (isAuth() && isAuth().role === 1) {
    updateBlogEndpoint = `${API}/blog/${slug}`;
  } else if (isAuth() && isAuth().role === 0) {
    updateBlogEndpoint = `${API}/user/blog/${slug}`;
  }
  return fetch(updateBlogEndpoint, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: blog
  })
    .then(response => response.json())
    .catch(error => console.error(error));
};

export const removeBlog = (slug, token) => {
  let deleteBlogEndpoint;

  if (isAuth() && isAuth().role === 1) {
    deleteBlogEndpoint = `${API}/blog/${slug}`;
  } else if (isAuth() && isAuth().role === 0) {
    deleteBlogEndpoint = `${API}/user/blog/${slug}`;
  }

  return fetch(deleteBlogEndpoint, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .catch(error => console.error(error));
};

export const blogSearch = params => {
  console.log('search params', params);
  const query = queryString.stringify(params);
  console.log('query params', query);

  return fetch(`${API}/blogs/search?${query}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .catch(error => console.error(error));
};
