import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { fetchBlog, fetchRelatedBlogs } from '../../actions/blog';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import RelatedBlogs from '../../components/blog/RelatedBlogs/RelatedBlogs';
import Blog from '../../components/blog/Blog/Blog';
import DisqusThread from '../../components/disqus/DisqusThread';

const BlogPage = ({ blog, query }) => {
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const loadRelatedBlogs = () => {
    fetchRelatedBlogs(blog).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelatedBlogs(data);
      }
    });
  };

  useEffect(() => {
    loadRelatedBlogs();
  }, []);

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
        <main className='container'>
          <Blog blog={blog} />

          {/* <div className='container mt-5'>
            <h4 className='text-center'>Related Blogs</h4>
            <hr />
            <div className='row'>
              {relatedBlogs.map((blog) => (
                <div className='col-md-4' key={blog._id}>
                  <RelatedBlogCard blog={blog} />
                </div>
              ))}
            </div>
          </div> */}

          <RelatedBlogs relatedBlogs={relatedBlogs} />

          <DisqusThread
            id={blog._id}
            title={blog.title}
            path={`/blog/${blog.slug}`}
          />
        </main>
      </Layout>
    </>
  );
};

BlogPage.getInitialProps = ({ query }) => {
  return fetchBlog(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { blog: data, query };
    }
  });
};

export default BlogPage;
