import Head from "next/head";
import Layout from "../../components/Layout";
import { getTag } from "../../actions/tag";
import { DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import BlogTag from "../../components/BlogTag/BlogTag";

const Tag = ({ tag, blogs, query }) => {
  return (
    <Layout>
      <Head>
        <title>
          {tag.name} | {APP_NAME}
        </title>
        <meta
          name="description"
          content={`Best programming blogs and tutorials on ${tag.name}`}
        />

        <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
        <meta property="og:title" content={`${tag.name} | ${APP_NAME}`} />
        <meta property="og:description" content={`${tag.name} | ${APP_NAME}`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${DOMAIN}/categories/${query.slug}`}
        />
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
      <BlogTag tag={tag} blogs={blogs} />
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
