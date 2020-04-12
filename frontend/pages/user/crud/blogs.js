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
          <ReadBlogs username={username} />
        </div>
      </Private>
    </Layout>
  );
};

export default Blogs;
