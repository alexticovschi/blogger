import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { useState } from 'react';
import { fetchBlog } from '../../actions/blog';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';

const BlogPage = ({ blog, query }) => {
  return (
    <>
      <Layout>
        <Head>
          <title>Programming blogs | {APP_NAME}</title>
          <meta name='description' content={blog.mdesc} />

          <link rel='canonical' href={`${DOMAIN}/blogs/${query.slug}`} />
          <meta property='og:title' content={`${blog.title} | ${APP_NAME}`} />
          <meta property='og:description' content={blog.mdesc} />
          <meta property='og:type' content='website' />
          <meta
            property='og:url'
            content={`${DOMAIN}/blogs/${query.pathname}`}
          />
          <meta property='og:site_name' content={`${APP_NAME}`} />

          <meta
            property='og:image'
            content={`${API}/blog/photo/${blog.slug}`}
          />
          <meta
            property='og:image:secure_url'
            content={`${API}/blog/photo/${blog.slug}`}
          />
          <meta property='og:image:type' content='/image/jpg' />
          <meta property='fb:app_id' content={`${FB_APP_ID}`} />
        </Head>
        <main>
          <article>
            <div className='container-fluid'>
              <section>
                <div className='row'>
                  <img
                    src={`${API}/blog/photo/${blog.slug}`}
                    alt={blog.title}
                    className='img img-fluid featured-image'
                  />
                </div>
              </section>
            </div>

            <div className='container'>
              <section>
                <h1 className='py-3 text-center'>{blog.title}</h1>
                <p className='mark ml-1 py-2'>
                  Written by {blog.postedBy.name} | Published{' '}
                  {moment(blog.updatedAt).fromNow()}
                </p>
              </section>
              <section className='mb-3'>
                {blog.categories.map(category => (
                  <Link
                    key={category._id}
                    href={`/categories/${category.slug}`}
                  >
                    <a className='btn btn-primary mr-2 mt-1'>{category.name}</a>
                  </Link>
                ))}

                {blog.tags.map(tag => (
                  <Link key={tag._id} href={`/tags/${tag.slug}`}>
                    <a className='btn btn-outline-primary mr-2 mt-1'>
                      {tag.name}
                    </a>
                  </Link>
                ))}
                <br />
              </section>
              <section>
                <div className='row'>
                  <div className='col-xl-12'>{renderHTML(blog.body)}</div>
                </div>
              </section>
            </div>

            <div className='container mt-5'>
              <h4 className='text-center'>Related Blogs</h4>
              <hr />
              <p>show related blogs</p>
            </div>
          </article>
        </main>
      </Layout>
    </>
  );
};

BlogPage.getInitialProps = ({ query }) => {
  return fetchBlog(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { blog: data, query };
    }
  });
};

export default BlogPage;
