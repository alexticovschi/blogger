import Layout from '../../components/Layout';
import Private from '../../components/auth/Private/Private';
import Link from 'next/link';

const UserPage = () => (
  <Layout>
    <Private>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 py-5'>
            <h4>User Dashboard</h4>
          </div>
          <div className='col-md-4'>
            <ul className='list-group'>
              <li className='list-group-item'>
                <Link href='/user/crud/blog'>
                  <a>Create Blog</a>
                </Link>
              </li>

              <li className='list-group-item'>
                <Link href='/user/crud/blogs'>
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
    </Private>
  </Layout>
);

export default UserPage;
