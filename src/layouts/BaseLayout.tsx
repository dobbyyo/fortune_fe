import { ErrorModal, LoadingBar } from '@/components/Common';
import MainContent from '@/components/Common/MainContent';
import Header from '@/components/Header/Header';
import { useCSRFQuery } from '@/services/queries/csrf.query';
import { errorState } from '@/stores/useErrorStore';
import { loadingState } from '@/stores/useLoadingStore';
import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';

const BaseLayout = ({ children }: { children: ReactNode }) => {
  const isLoading = useRecoilValue(loadingState); // 로딩 상태 구독
  const isError = useRecoilValue(errorState); // 에러 상태 구독
  useCSRFQuery();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {isLoading && <LoadingBar />}
      {isError && <ErrorModal />}
      <MainContent>{children}</MainContent>
    </div>
  );
};

export default BaseLayout;
