import Layout from '../components/Layout';
import Link from 'next/link';
import Hero from '../components/HomeComponents/Hero/Hero';
import Categories from '../components/HomeComponents/Categories/Categories';

const Index = () => (
  <Layout>
    <Hero />
    <Categories />
  </Layout>
);

export default Index;
