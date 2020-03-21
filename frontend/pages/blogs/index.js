import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useState } from 'react';
import { fetchBlogsWithCategoriesAndTags } from '../../actions/blog';
import { API } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';

const BlogsPage = ({ blogs, categories, tags, size }) => {
  return (
    <Layout>
      <main>
        <header>
          <div className='container-fluid'>
            <div className='col-xl-12 pt-3'>
              <h1 className='display-5 font-weight-bold text-center'>
                Programming blogs and tutorials
              </h1>
            </div>
          </div>
        </header>

        <div className='container-fluid'>
          <div className='row'>
            <div className='col-xl-12'>
              {blogs &&
                blogs.map((blog, i) => (
                  <article key={i} className='mb-4'>
                    <div className='lead'>
                      <header>
                        <Link href={`/blogs/${blog.slug}`}>
                          <a>
                            <h2 className='py-3'>{blog.title}</h2>
                          </a>
                        </Link>
                      </header>
                      <section>
                        <p className='mark ml-1 py-2'>
                          Written by {blog.postedBy.name} | Published{' '}
                          {moment(blog.updatedAt).fromNow()}
                        </p>
                      </section>
                      <section>
                        <p>show categories and tags</p>
                      </section>

                      <div className='row'>
                        <div className='col-xl-4'>Image</div>
                        <div className='col-xl-8'>
                          <section>
                            <div>{renderHTML(blog.excerpt)}</div>
                            <Link href={`/blog/${blog.slug}`}>
                              <a className='btn btn-primary mt-3'>Read More</a>
                            </Link>
                          </section>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </article>
                ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

BlogsPage.getInitialProps = () => {
  return fetchBlogsWithCategoriesAndTags().then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        size: data.size
      };
    }
  });
};

export default BlogsPage;
