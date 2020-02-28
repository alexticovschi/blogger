import Header from './Header/Header';
import './Layout.scss';
const Layout = ({ children }) => (
  <>
    <Header />
    {children}
    <p>Footer</p>
  </>
);

export default Layout;
