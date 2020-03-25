import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin/Admin';
import UpdateBlog from '../../../components/crud/UpdateBlog/UpdateBlog';

const UpdateBlogPage = () => {
  return (
    <Layout>
      <Admin>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 py-5'>
              <h4>Update blog</h4>
            </div>
            <UpdateBlog />
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default UpdateBlogPage;
