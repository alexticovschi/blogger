import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin/Admin';
import Category from '../../../components/crud/Category/Category';

const CategoryTag = () => (
  <Layout>
    <Admin>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 py-5'>
            <h4>Manage Categories and Tags</h4>
          </div>
          <div className='col-md-6'>
            <Category />
          </div>
          <div className='col-md-6'>
            <h5>Tag</h5>
          </div>
        </div>
      </div>
    </Admin>
  </Layout>
);

export default CategoryTag;
