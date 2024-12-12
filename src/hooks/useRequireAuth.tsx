import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckAuthQuery } from '@/services/queries/auth.query';

const useRequireAuth = () => {
  const navigate = useNavigate();
  const { data: checkLogin, isLoading, isError } = useCheckAuthQuery();

  useEffect(() => {
    if (!isLoading && (isError || (checkLogin && checkLogin.status !== 200))) {
      navigate('/login', { replace: true }); // 로그인 페이지로 리디렉션
    }
  }, [checkLogin, isLoading, isError, navigate]);

  return { isLoading, isAuthenticated: checkLogin?.status === 200 };
};

export default useRequireAuth;
