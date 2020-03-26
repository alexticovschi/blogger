import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getCategory } from '../../actions/category';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Card from '../../components/blog/Card/Card';

const Category = ({ category, blogs, query }) => {
  return (
    <Layout>
      <Head>
        <title>
          {category.name} | {APP_NAME}
        </title>
        <meta
          name='description'
          content={`Best programming blogs and tutorials on ${category.name}`}
        />

        <link rel='canonical' href={`${DOMAIN}/categories/${query.slug}`} />
        <meta property='og:title' content={`${category.name} | ${APP_NAME}`} />
        <meta
          property='og:description'
          content={`${category.name} | ${APP_NAME}`}
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content={`${DOMAIN}/categories/${query.slug}`}
        />
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
        <div className='container text-center'>
          <header>
            <div className='col-xl-12'>
              <h1 className='display-4 font-weight-bold py-5'>
                {category.name}
              </h1>
              {blogs.map(blog => (
                <div>
                  <Card key={blog._id} blog={blog} />
                  <hr />
                </div>
              ))}
            </div>
          </header>
        </div>
      </main>
    </Layout>
  );
};

Category.getInitialProps = async ({ query }) => {
  // fetch the category and its associated blogs
  const data = await getCategory(query.slug);

  try {
    if (data) {
      return { category: data.category, blogs: data.blogs, query };
    }
  } catch (error) {
    console.error(error);
  }
};

export default Category;
