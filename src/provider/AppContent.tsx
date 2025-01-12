import { useCheckAuthQuery } from '@/services/queries/auth.query';
import { authState } from '@/stores/useAuthStore';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import Router from '@/routes/Router';
import { LoadingBar } from '@/components/Common';

function AppContent() {
  const setAuthState = useSetRecoilState(authState);

  const { data, isLoading } = useCheckAuthQuery();

  // Recoil 상태 업데이트
  useEffect(() => {
    if (!isLoading) {
      setAuthState({
        isLoading: false,
        isAuthenticated: data?.status === 200,
      });
    }
  }, [data, isLoading, setAuthState]);

  if (isLoading) {
    return <LoadingBar />; // 로딩 상태 처리
  }

  return <Router />;
}

export default AppContent;
