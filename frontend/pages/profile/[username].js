import Head from 'next/head';
import Layout from '../../components/Layout';
import { userProfile } from '../../actions/user';
import { DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import Profile from '../../components/Profile/Profile';

const UserProfile = ({ user, blogs, query }) => {
  return (
    <Layout>
      <Head>
        <title>
          {user.name} | {APP_NAME}
        </title>
        <meta name='description' content={`Blogs by ${user.username}`} />

        <link rel='canonical' href={`${DOMAIN}/profile/${query.username}`} />
        <meta property='og:title' content={`${user.username} | ${APP_NAME}`} />
        <meta property='og:description' content={`Blogs by ${user.username}`} />
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content={`${DOMAIN}/profile/${query.username}`}
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
      <Profile user={user} blogs={blogs} />
    </Layout>
  );
};

UserProfile.getInitialProps = async ({ query }) => {
  const response = await userProfile(query.username);
  return { user: response.user, blogs: response.blogs, query };
};

export default UserProfile;
