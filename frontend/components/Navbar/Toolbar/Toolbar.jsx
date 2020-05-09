import { isAuth, signout } from '../../../actions/auth';
import Router from 'next/router';
import Link from 'next/link';
import Search from '../../blog/Search/Search';

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.scss';

const Toolbar = ({ isOpen, drawerClickHandler }) => (
  <header className='toolbar'>
    <div className='toolbar-wrapper'>
      <nav className='toolbar__navigation'>
        <div className='toolbar__logo'>
          <Link href='/'>
            <a>
              Blogging <span>Coder</span>
            </a>
          </Link>
        </div>
        <div className='spacer' />
        <div className='toolbar_navigation-items'>
          <ul>
            <li>
              <Search />
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
                      <a>Dashboard</a>
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link href='/user'>
                      <a>Dashboard</a>
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
        </div>

        <div className='toolbar__toggle-button'>
          <DrawerToggleButton isOpen={isOpen} click={drawerClickHandler} />
        </div>
      </nav>
    </div>
  </header>
);

export default Toolbar;
