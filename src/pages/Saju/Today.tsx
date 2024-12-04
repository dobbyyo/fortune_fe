import { LoadingBar } from '@/components/Common';
import { useTodayFortuneQuery } from '@/services/queries/saju.query';
import { userState } from '@/stores/useAuthStore';
import { loadingState } from '@/stores/useLoadingStore';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const Today = () => {
  const setIsLoading = useSetRecoilState(loadingState);
  const myData = useRecoilValue(userState);

  const userId = myData?.id;

  const {
    data: todayFortune,
    isLoading,
    isError,
  } = useTodayFortuneQuery(myData?.id, {
    enabled: userId !== undefined, // userId가 정의되었을 때만 쿼리 실행
  });

  console.log('todayFortune:', todayFortune);

  useEffect(() => {
    setIsLoading(isLoading);
    if (isError) setIsLoading(false);
  }, [isLoading, isError, setIsLoading]);

  if (!userId) {
    return <LoadingBar />;
  }

  return <div>asd</div>;
};

export default Today;
