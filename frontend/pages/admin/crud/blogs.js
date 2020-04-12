import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin/Admin';
import ReadBlogs from '../../../components/crud/ReadBlogs/ReadBlogs';

const Blogs = () => {
  return (
    <Layout>
      <Admin>
        <div className='container'>
          <ReadBlogs />
        </div>
      </Admin>
    </Layout>
  );
};

export default Blogs;
