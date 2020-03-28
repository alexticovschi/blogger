import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import moment from 'moment';
import { userProfile } from '../../actions/user';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';

const UserProfile = ({ user, blogs, query }) => {
  console.log(user);
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
      <div className='container'>
        <div className='row'>
          <div className='col-xl-12'>
            <div className='card'>
              <div className='card-body'>
                <h5>{user.name}</h5>
                <p className='text-muted'>
                  Joined {moment(user.createdAt).fromNow()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-body'>
                <div className='p-3 mb-2 bg-info text-white'>{`Latest blogs by ${user.name}`}</div>
                {blogs.map(blog => (
                  <div className='py-2' key={blog._id}>
                    <Link href={`/blogs/${blog.slug}`}>
                      <a className='lead'>{blog.title}</a>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-body'>
                <div className='p-3 mb-2 bg-info text-white'>{`Message ${user.name}`}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

UserProfile.getInitialProps = async ({ query }) => {
  const response = await userProfile(query.username);
  return { user: response.user, blogs: response.blogs, query };
};

export default UserProfile;
