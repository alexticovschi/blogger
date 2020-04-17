import Layout from '../../components/Layout';
import Private from '../../components/auth/Private/Private';
import UserDashboard from '../../components/UserDashboard/UserDashboard';
import Link from 'next/link';

const UserPage = () => (
  <Layout>
    <Private>
      <UserDashboard />
    </Private>
  </Layout>
);

export default UserPage;
