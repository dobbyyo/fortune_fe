import { useCheckAuthQuery } from '@/services/queries/auth.query';
import { authState, userState } from '@/stores/useAuthStore';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import Router from '@/routes/Router';
import { LoadingBar } from '@/components/Common';
import { useMyDataQuery } from '@/services/queries/user.query';

function AppContent() {
  const setAuthState = useSetRecoilState(authState);
  const setUserDatas = useSetRecoilState(userState);

  const { data: checkLogin, isLoading } = useCheckAuthQuery();
  const { data: myData, isLoading: isFetchingData } = useMyDataQuery({
    enabled: checkLogin?.status === 200,
  });

  // Recoil 상태 업데이트
  useEffect(() => {
    if (!isLoading) {
      setAuthState({
        isLoading: false,
        isAuthenticated: checkLogin?.status === 200,
      });

      if (checkLogin?.status === 200) {
        setUserDatas(myData?.myInfo);
      }
    }
  }, [checkLogin, isLoading, setAuthState, isFetchingData]);

  if (isLoading) {
    return <LoadingBar />; // 로딩 상태 처리
  }

  return <Router />;
}

export default AppContent;
