import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private/Private';
import UpdateBlog from '../../../components/crud/UpdateBlog/UpdateBlog';

const UpdateBlogPage = () => {
  return (
    <Layout>
      <Private>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 py-5'>
              <h4>Update blog</h4>
            </div>
            <UpdateBlog />
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default UpdateBlogPage;
