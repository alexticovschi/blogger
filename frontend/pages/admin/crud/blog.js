import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin/Admin';
import CreateBlog from '../../../components/crud/CreateBlog/CreateBlog';

const Blog = () => {
  return (
    <Layout>
      <Admin>
        <div className='container'>
          <CreateBlog />
        </div>
      </Admin>
    </Layout>
  );
};

export default Blog;
