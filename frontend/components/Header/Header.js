import { useState } from 'react';
import Link from 'next/link';
import { isAuth, signout } from '../../actions/auth';
import Router from 'next/router';
import NProgress from 'nprogress';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import Search from '../blog/Search/Search';
import './Header.scss';

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar color='light' light expand='md'>
        <Link href='/'>
          <NavLink className='logo'>BloggingCoder</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <Link href='/blogs'>
                <NavLink>Blogs</NavLink>
              </Link>
            </NavItem>
            {isAuth() ? (
              <>
                {isAuth().role === 1 ? (
                  <NavItem>
                    <Link href='/admin'>
                      <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
                    </Link>
                  </NavItem>
                ) : (
                  <NavItem>
                    <Link href='/user'>
                      <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
                    </Link>
                  </NavItem>
                )}
                <NavItem>
                  <Link href='/signin'>
                    <NavLink
                      onClick={() => signout(() => Router.replace('/signin'))}
                    >
                      SignOut
                    </NavLink>
                  </Link>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <Link href='/signin'>
                    <NavLink>SignIn</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href='/signup'>
                    <NavLink>SignUp</NavLink>
                  </Link>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
      <Search />
    </>
  );
};

export default Header;
