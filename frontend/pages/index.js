import Layout from '../components/Layout';
import Link from 'next/link';
import Hero from '../components/HomeComponents/Hero/Hero';
import Categories from '../components/HomeComponents/Categories/Categories';

const Index = () => (
  <Layout>
    <div className='container'>
      <Hero />
      <Categories />
    </div>
  </Layout>
);

export default Index;
