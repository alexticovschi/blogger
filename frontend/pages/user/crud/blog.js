import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private/Private';
import CreateBlog from '../../../components/crud/CreateBlog/CreateBlog';

const UserCreateBlog = () => {
  return (
    <Layout>
      <Private>
        <div className='container'>
          <CreateBlog />
        </div>
      </Private>
    </Layout>
  );
};

export default UserCreateBlog;
