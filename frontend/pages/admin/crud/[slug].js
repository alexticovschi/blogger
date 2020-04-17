import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin/Admin';
import UpdateBlog from '../../../components/crud/UpdateBlog/UpdateBlog';

const UpdateBlogPage = () => {
  return (
    <Layout>
      <Admin>
        <UpdateBlog />
      </Admin>
    </Layout>
  );
};

export default UpdateBlogPage;
