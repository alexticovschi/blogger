import moment from 'moment';
import Link from 'next/link';
import { API } from '../../config';

import './Profile.scss';

const Profile = ({ user, blogs }) => {
  return (
    <section className='profile'>
      <div className='profile__header'>
        <figure>
          <img
            className='profile__img'
            src={`${API}/user/photo/${user.username}`}
            alt='user profile'
          />
        </figure>
        <div className='profile__header__user-info'>
          <h5 className='profile__username'>{user.name}</h5>
          <p className='profile__joined'>
            Joined {moment(user.createdAt).fromNow()}
          </p>

          <ul className='profile__contact'>
            <li>
              <a
                className='profile__contact--link'
                href='https://www.facebook.com/'
              >
                <img
                  className='profile__contact__icon'
                  src='../images/social-icons/facebook.svg'
                  alt=''
                />{' '}
              </a>
            </li>
            <li>
              <a
                className='profile__contact--link'
                href='https://www.twitter.com/'
              >
                <img
                  className='profile__contact__icon'
                  src='../images/social-icons/twitter.svg'
                  alt=''
                />
              </a>
            </li>
            <li>
              <a
                className='profile__contact--link'
                href='https://www.linkedin.com/'
              >
                <img
                  className='profile__contact__icon'
                  src='../images/social-icons/linkedin.svg'
                  alt=''
                />
              </a>
            </li>
            <li>
              <a
                className='profile__contact--link'
                href={`mailto:${user.email}`}
              >
                <img
                  className='profile__contact__icon'
                  src='../images/social-icons/email.svg'
                  alt=''
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='profile__user-blogs'>
        <h2 className='profile__blogs-by'>
          Latest blogs by{' '}
          <span className='profile__blogs-by__name'>{user.name}</span>
        </h2>

        {blogs.map((blog) => {
          console.log(blog);
          return (
            <div className='profile__blog-card'>
              <Link href={`/blogs/${blog.slug}`} key={blog._id}>
                <a>
                  <h4 className='profile__blog-card__title'>{blog.title}</h4>
                </a>
              </Link>

              <p className='profile__blog-card__posted'>
                Posted &middot;
                <span className='profile__blog-card__posted-date'>
                  {moment(blog.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Profile;
