import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin/Admin';
import CreateBlog from '../../../components/crud/CreateBlog/CreateBlog';

const Blog = () => {
  return (
    <Layout>
      <Admin>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 py-5'>
              <h4>Create new blog</h4>
            </div>
            <div className='col-md-12'>
              <CreateBlog />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Blog;
