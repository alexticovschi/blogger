import Head from 'next/head';
import Layout from '../../components/Layout';
import Card from '../../components/blog/Card/Card';
import { useState } from 'react';
import { fetchBlogsWithCategoriesAndTags } from '../../actions/blog';
import Link from 'next/link';

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

export default BlogsPage;
