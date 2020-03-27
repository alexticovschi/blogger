import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import Card from '../../components/blog/Card/Card';
import { useState } from 'react';
import { fetchBlogsWithCategoriesAndTags } from '../../actions/blog';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';

const BlogsPage = props => {
  const {
    blogs,
    categories,
    tags,
    totalBlogs,
    blogsLimit,
    blogsSkip,
    router
  } = props;

  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const loadMoreBlogs = () => {
    let blogsToSkip = limit + skip;

    // merge blogs to existing ones
    fetchBlogsWithCategoriesAndTags(blogsToSkip, limit).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(blogsToSkip);
      }
    });
  };

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
          <div className='container'>
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

        <div className='container'>
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
        <div className='container'>
          <div className='row'>
            <div className='col-xl-12'>
              {loadedBlogs &&
                loadedBlogs.map((blog, i) => (
                  <article key={i} className='mb-4'>
                    <Card blog={blog} />
                    <hr />
                  </article>
                ))}
            </div>
          </div>
        </div>
        <div className='container'>
          {/* if size greater than 0 and size is greater than or equal to limit, show button */}
          {size > 0 && size >= limit && (
            <div className='row'>
              <div className='col-xl-12 text-center'>
                <button
                  onClick={loadMoreBlogs}
                  className='btn btn-outline-dark btn-block'
                >
                  Load More
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

BlogsPage.getInitialProps = () => {
  let skip = 0;
  let limit = 2;
  return fetchBlogsWithCategoriesAndTags(skip, limit).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogsLimit: limit,
        blogsSkip: skip
      };
    }
  });
};

export default withRouter(BlogsPage);
