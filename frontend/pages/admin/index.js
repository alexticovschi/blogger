import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin/Admin';
import AdminDashboard from '../../components/AdminDashboard/AdminDashboard';

const AdminPage = () => (
  <Layout>
    <Admin>
      <div className='container'>
        <AdminDashboard />
      </div>
    </Admin>
  </Layout>
);

export default AdminPage;
