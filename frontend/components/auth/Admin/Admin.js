import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuth } from '../../../actions/auth';

const Admin = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuth()) {
      router.push('/signin');
    } else if (isAuth().role !== 1) {
      router.push('/');
    }
  }, []);

  return <>{children}</>;
};

export default Admin;
