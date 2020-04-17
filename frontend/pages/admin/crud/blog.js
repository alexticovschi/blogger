import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin/Admin';
import CreateBlog from '../../../components/crud/CreateBlog/CreateBlog';

const Blog = () => {
  return (
    <Layout>
      <Admin>
        <CreateBlog />
      </Admin>
    </Layout>
  );
};

export default Blog;
