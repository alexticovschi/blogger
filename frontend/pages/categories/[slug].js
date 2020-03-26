import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getCategory } from '../../actions/category';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Card from '../../components/blog/Card/Card';

const Category = ({ category, blogs }) => {
  return (
    <React.Fragment>
      <Layout>
        <main>
          <div className='container text-center'>
            <header>
              <div className='col-xl-12'>
                <h1 className='display-4 font-weight-bold py-5'>
                  {category.name}
                </h1>
                {blogs.map((b, i) => (
                  <div>
                    <Card key={i} blog={b} />
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

Category.getInitialProps = async ({ query }) => {
  // fetch the category and its associated blogs
  const data = await getCategory(query.slug);

  try {
    if (data) {
      return { category: data.category, blogs: data.blogs };
    }
  } catch (error) {
    console.error(error);
  }
};

export default Category;
