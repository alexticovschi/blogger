import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import './Layout.scss';

const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

export default Layout;
