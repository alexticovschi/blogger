import { isAuth, signout } from '../../../actions/auth';
import Router from 'next/router';
import Link from 'next/link';

import './SideDrawer.scss';

const SideDrawer = ({ show }) => {
  return (
    <nav className={show ? 'side-drawer open' : 'side-drawer'}>
      <ul>
        <li>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href='/blogs'>
            <a>Blogs</a>
          </Link>
        </li>
        <li>
          <Link href='/contact'>
            <a>Contact</a>
          </Link>
        </li>
        {isAuth() ? (
          <>
            {isAuth().role === 1 ? (
              <li>
                <Link href='/admin'>
                  <a>{`${isAuth().name}`}</a>
                </Link>
              </li>
            ) : (
              <li>
                <Link href='/user'>
                  <a>{`${isAuth().name}`}</a>
                </Link>
              </li>
            )}
            <li>
              <Link href='/signin'>
                <a onClick={() => signout(() => Router.replace('/signin'))}>
                  SignOut
                </a>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href='/signin'>
                <a>SignIn</a>
              </Link>
            </li>
            <li>
              <Link href='/signup'>
                <a>SignUp</a>
              </Link>
            </li>
          </>
        )}
        <li>
          <a href='/user/crud/blog'>Write</a>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;
