import Layout from '../../components/Layout';
import Private from '../../components/auth/Private/Private';

const UserPage = () => (
  <Layout>
    <Private>
      <h2>User Dashboard</h2>
    </Private>
  </Layout>
);

export default UserPage;
