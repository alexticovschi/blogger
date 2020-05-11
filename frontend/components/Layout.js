import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Layout.scss';

const Layout = ({ children }) => (
  <>
    <Navbar />
    <div className='container'>{children}</div>
    <Footer />
    <ToastContainer />
  </>
);

export default Layout;
