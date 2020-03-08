import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin/Admin';
import Category from '../../../components/crud/Category/Category';
import Tag from '../../../components/crud/Tag/Tag';

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
            <Tag />
          </div>
        </div>
      </div>
    </Admin>
  </Layout>
);

export default CategoryTag;
