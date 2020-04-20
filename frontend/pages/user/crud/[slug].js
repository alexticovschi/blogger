import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private/Private';
import UpdateBlog from '../../../components/crud/UpdateBlog/UpdateBlog';

const UpdateBlogPage = () => {
  return (
    <Layout>
      <Private>
        <UpdateBlog />
      </Private>
    </Layout>
  );
};

export default UpdateBlogPage;
