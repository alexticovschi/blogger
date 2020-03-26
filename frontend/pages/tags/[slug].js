import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getTag } from '../../actions/tag';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Card from '../../components/blog/Card/Card';

const Tag = ({ tag, blogs, query }) => {
  return (
    <Layout>
      <Head>
        <title>
          {tag.name} | {APP_NAME}
        </title>
        <meta
          name='description'
          content={`Best programming blogs and tutorials on ${tag.name}`}
        />

        <link rel='canonical' href={`${DOMAIN}/categories/${query.slug}`} />
        <meta property='og:title' content={`${tag.name} | ${APP_NAME}`} />
        <meta property='og:description' content={`${tag.name} | ${APP_NAME}`} />
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
              <h1 className='display-4 font-weight-bold py-5'>{tag.name}</h1>
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

Tag.getInitialProps = async ({ query }) => {
  // fetch the tag and its associated blogs
  const data = await getTag(query.slug);

  try {
    if (data) {
      return { tag: data.tag, blogs: data.blogs, query };
    }
  } catch (error) {
    console.error(error);
  }
};

export default Tag;
