import Link from 'next/link';
import './UserDashboard.scss';

const UserDashboard = () => {
  return (
    <section className='user-dashboard'>
      <div className='user-dashboard__banner'>
        <h4 className='user-dashboard__title'>User Dashboard</h4>
      </div>
      <ul className='user-dashboard__list-group'>
        <li className='user-dashboard__list-group-item'>
          <img
            className='user-dashboard__list-group-item__icon'
            src='images/dashboard-icons/blog.svg'
            alt=''
          />
          <Link href='/user/crud/blog'>
            <a>Create Blog</a>
          </Link>
        </li>

        <li className='user-dashboard__list-group-item'>
          <img
            className='user-dashboard__list-group-item__icon'
            src='images/dashboard-icons/update.svg'
            alt=''
          />
          <Link href='/user/crud/blogs'>
            <a>Update / Delete Blogs</a>
          </Link>
        </li>

        <li className='user-dashboard__list-group-item'>
          <img
            className='user-dashboard__list-group-item__icon'
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

export default UserDashboard;
