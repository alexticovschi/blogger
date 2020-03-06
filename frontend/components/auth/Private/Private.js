import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuth } from '../../../actions/auth';

const Private = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuth()) {
      router.push('/signin');
    }
  }, []);

  return <>{children}</>;
};

export default Private;
