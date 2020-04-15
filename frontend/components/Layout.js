import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import './Layout.scss';

const Layout = ({ children }) => (
  <>
    <Navbar />
    <div className='container'>{children}</div>
    <Footer />
  </>
);

export default Layout;
