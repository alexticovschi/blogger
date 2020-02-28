import Header from './Header/Header';

const Layout = ({ children }) => (
  <>
    <Header />
    {children}
    <p>Footer</p>
  </>
);

export default Layout;
