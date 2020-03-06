import { useState } from 'react';
import Link from 'next/link';
import { isAuth, signout } from '../../actions/auth';
import { useRouter } from 'next/router';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import './Header.scss';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const router = useRouter();

  return (
    <div>
      <Navbar color='light' light expand='md'>
        <Link href='/'>
          <NavLink className='logo'>BloggingCoder</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto' navbar>
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
                      onClick={() => signout(() => router.replace('/signin'))}
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
    </div>
  );
};

export default Header;
