import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private/Private';
import ReadBlogs from '../../../components/crud/ReadBlogs/ReadBlogs';
import { isAuth } from '../../../actions/auth';
const Blogs = () => {
  const username = isAuth() && isAuth().username;
  return (
    <Layout>
      <Private>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 py-5'>
              <h4>Manage Blogs</h4>
            </div>
            <div className='col-xl-12'>
              <ReadBlogs username={username} />
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default Blogs;
