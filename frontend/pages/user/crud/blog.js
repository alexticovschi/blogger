import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private/Private';
import CreateBlog from '../../../components/crud/CreateBlog/CreateBlog';

const UserCreateBlog = () => {
  return (
    <Layout>
      <Private>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 py-5'>
              <h4>Create new blog</h4>
            </div>
            <CreateBlog />
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default UserCreateBlog;
