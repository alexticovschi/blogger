import Header from './Header/Header';
import Footer from './Footer/Footer';
import './Layout.scss';

const Layout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default Layout;
