import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin/Admin';
import Link from 'next/link';

const AdminPage = () => (
  <Layout>
    <Admin>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 py-5'>
            <h4>Admin Dashboard</h4>
          </div>
          <div className='col-md-4'>
            <ul className='list-group'>
              <li className='list-group-item'>
                <Link href='/admin/crud/category-tag'>
                  <a>Create Category</a>
                </Link>
              </li>
              <li className='list-group-item'>
                <Link href='/admin/crud/category-tag'>
                  <a>Create Tags</a>
                </Link>
              </li>

              <li className='list-group-item'>
                <Link href='/admin/crud/blog'>
                  <a>Create Blog</a>
                </Link>
              </li>

              <li className='list-group-item'>
                <Link href='/admin/crud/blogs'>
                  <a>Update/Delete Blogs</a>
                </Link>
              </li>

              <li className='list-group-item'>
                <Link href='/user/update'>
                  <a>Update Profile</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className='col-md-8'>right</div>
        </div>
      </div>
    </Admin>
  </Layout>
);

export default AdminPage;
