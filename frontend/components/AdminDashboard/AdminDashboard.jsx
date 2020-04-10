import Link from 'next/link';
import './AdminDashboard.scss';

const AdminDashboard = () => {
  return (
    <section className='admin-dashboard'>
      <div className='admin-dashboard__banner'>
        <h4 className='admin-dashboard__title'>Admin Dashboard</h4>
      </div>
      <ul className='admin-dashboard__list-group'>
        <li className='admin-dashboard__list-group-item'>
          <img
            className='admin-dashboard__list-group-item__icon'
            src='images/dashboard-icons/category.svg'
            alt=''
          />
          <Link href='/admin/crud/category-tag'>
            <a>Create Categories</a>
          </Link>
        </li>
        <li className='admin-dashboard__list-group-item'>
          <img
            className='admin-dashboard__list-group-item__icon'
            src='images/dashboard-icons/tag.svg'
            alt=''
          />
          <Link href='/admin/crud/category-tag'>
            <a>Create Tags</a>
          </Link>
        </li>

        <li className='admin-dashboard__list-group-item'>
          <img
            className='admin-dashboard__list-group-item__icon'
            src='images/dashboard-icons/blog.svg'
            alt=''
          />
          <Link href='/admin/crud/blog'>
            <a>Create Blog</a>
          </Link>
        </li>

        <li className='admin-dashboard__list-group-item'>
          <img
            className='admin-dashboard__list-group-item__icon'
            src='images/dashboard-icons/update.svg'
            alt=''
          />
          <Link href='/admin/crud/blogs'>
            <a>Update / Delete Blogs</a>
          </Link>
        </li>

        <li className='admin-dashboard__list-group-item'>
          <img
            className='admin-dashboard__list-group-item__icon'
            src='images/dashboard-icons/edit.svg'
            alt=''
          />
          <Link href='/user/update'>
            <a>Update Profile</a>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default AdminDashboard;
