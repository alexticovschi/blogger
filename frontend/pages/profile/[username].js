import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import moment from 'moment';
import { userProfile } from '../../actions/user';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';

const UserProfile = ({ user, blogs }) => {
  return (
    <>
      <Layout>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-12'>
              <div className='card'>
                <div className='card-body'>
                  <h5>{user.name}</h5>
                  <p className='text-muted'>
                    Joined {moment(user.createdAt).fromNow()}
                  </p>
                  {/* {JSON.stringify(blogs)} */}
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
    </>
  );
};

UserProfile.getInitialProps = async ({ query: { username } }) => {
  const response = await userProfile(username);
  return { user: response.user, blogs: response.blogs };
};

export default UserProfile;
