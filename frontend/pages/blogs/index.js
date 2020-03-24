import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import Card from '../../components/blog/Card/Card';
import { useState } from 'react';
import { fetchBlogsWithCategoriesAndTags } from '../../actions/blog';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';

const BlogsPage = ({ blogs, categories, tags, size, router }) => {
  return (
    <Layout>
      <Head>
        <title>Programming blogs | {APP_NAME}</title>
        <meta
          name='description'
          content='Programming blogs and tutorials on react node angular nextjs vue laravel and web development'
        />

        <link rel='canonical' href={`${DOMAIN}${router.pathname}`} />
        <meta
          property='og:title'
          content={`Latest web development tutorials | ${APP_NAME}`}
        />
        <meta
          property='og:description'
          content='Programming blogs and tutorials on react node angular nextjs vue laravel and web development'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={`${DOMAIN}${router.pathname}`} />
        <meta property='og:site_name' content={`${APP_NAME}`} />

        <meta
          property='og:image'
          content={`${DOMAIN}/images/bloggingcoder.jpg`}
        />
        <meta
          property='og:image:secure_url'
          content={`${DOMAIN}/images/bloggingcoder.jpg`}
        />
        <meta property='og:image:type' content='/image/jpg' />
        <meta property='fb:app_id' content={`${FB_APP_ID}`} />
      </Head>
      <main>
        <header>
          <div className='container-fluid'>
            <div className='col-xl-12 pt-3'>
              <h1 className='display-5 font-weight-bold text-center'>
                Programming blogs and tutorials
              </h1>

              <section className='text-center'>
                {categories.map(category => (
                  <Link
                    key={category._id}
                    href={`/categories/${category.slug}`}
                  >
                    <a className='btn btn-outline-info mr-2 mt-1'>
                      {category.name}
                    </a>
                  </Link>
                ))}

                {tags.map(tag => (
                  <Link key={tag._id} href={`/tags/${tag.slug}`}>
                    <a className='btn btn-outline-dark mr-2 mt-1'>{tag.name}</a>
                  </Link>
                ))}
              </section>
            </div>
          </div>
        </header>

        <div className='container-fluid'>
          <div className='row'>
            <div className='col-xl-12'>
              {blogs &&
                blogs.map((blog, i) => (
                  <article key={i} className='mb-4'>
                    <Card blog={blog} />
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

export default withRouter(BlogsPage);
