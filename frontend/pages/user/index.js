import Layout from '../../components/Layout';
import Private from '../../components/auth/Private/Private';
import UserDashboard from '../../components/UserDashboard/UserDashboard';
import Link from 'next/link';

const UserPage = () => (
  <Layout>
    <Private>
      <div className='container'>
        <UserDashboard />
      </div>
    </Private>
  </Layout>
);

export default UserPage;
