import Head from "next/head";
import { withRouter } from "next/router";
import Layout from "../../components/Layout";
import Blogs from "../../components/blog/Blogs/Blogs";
import LoadMore from "../../components/blog/LoadMore/LoadMore";
import BlogsHeader from "../../components/blog/BlogsHeader/BlogsHeader";
import { useState } from "react";
import { fetchBlogsWithCategoriesAndTags } from "../../actions/blog";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";

const BlogsPage = (props) => {
  const {
    blogs,
    categories,
    tags,
    totalBlogs,
    blogsLimit,
    blogsSkip,
    router,
  } = props;

  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const loadMoreBlogs = () => {
    let blogsToSkip = limit + skip;

    // merge blogs to existing ones
    fetchBlogsWithCategoriesAndTags(blogsToSkip, limit).then((data) => {
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
          name="description"
          content="Programming blogs and tutorials on react node angular nextjs vue laravel and web development"
        />

        <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
        <meta
          property="og:title"
          content={`Latest web development tutorials | ${APP_NAME}`}
        />
        <meta
          property="og:description"
          content="Programming blogs and tutorials on react node angular nextjs vue laravel and web development"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />

        <meta
          property="og:image"
          content={`${DOMAIN}/images/bloggingcoder.jpg`}
        />
        <meta
          property="og:image:secure_url"
          content={`${DOMAIN}/images/bloggingcoder.jpg`}
        />
        <meta property="og:image:type" content="/image/jpg" />
        <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        <link rel="shortcut icon" href="../../favicon.ico" />
      </Head>
      <BlogsHeader categories={categories} tags={tags} />
      <Blogs
        blogs={blogs}
        loadedBlogs={loadedBlogs}
        loadMoreBlogs={loadMoreBlogs}
        limit={limit}
      />
      <LoadMore size={size} limit={limit} loadMoreBlogs={loadMoreBlogs} />
    </Layout>
  );
};

BlogsPage.getInitialProps = () => {
  let skip = 0;
  let limit = 5;
  return fetchBlogsWithCategoriesAndTags(skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogsLimit: limit,
        blogsSkip: skip,
      };
    }
  });
};

export default withRouter(BlogsPage);
