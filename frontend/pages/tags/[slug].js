import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getTag } from '../../actions/tag';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Card from '../../components/blog/Card/Card';

const Tag = ({ tag, blogs }) => {
  return (
    <React.Fragment>
      <Layout>
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
    </React.Fragment>
  );
};

Tag.getInitialProps = async ({ query }) => {
  // fetch the tag and its associated blogs
  const data = await getTag(query.slug);

  try {
    if (data) {
      return { tag: data.tag, blogs: data.blogs };
    }
  } catch (error) {
    console.error(error);
  }
};

export default Tag;
