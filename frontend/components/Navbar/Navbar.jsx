import { useState } from 'react';
import NProgress from 'nprogress';
import Search from '../blog/Search/Search';
import Router from 'next/router';

import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';
import Backdrop from './Backdrop/Backdrop';

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Navbar = () => {
  const [sideDrawer, sideDrawerOpen] = useState(false);

  const drawerToggleClickHandler = () => {
    sideDrawerOpen((sideDrawer) => !sideDrawer);
  };
  const backdropClickHandler = () => sideDrawerOpen(false);

  return (
    <>
      <Toolbar
        isOpen={sideDrawer}
        drawerClickHandler={drawerToggleClickHandler}
      />
      <SideDrawer show={sideDrawer} />
      {sideDrawer && <Backdrop click={backdropClickHandler} />}
    </>
  );
};

export default Navbar;
