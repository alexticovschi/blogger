import Layout from '../components/Layout';
import ContactForm from '../components/form/ContactForm';

const Index = () => (
  <Layout>
    <div className='container'>
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <ContactForm />
        </div>
      </div>
    </div>
  </Layout>
);

export default Index;
