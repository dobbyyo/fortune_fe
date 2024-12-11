import { ErrorModal, LoadingBar } from '@/components/Common';
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
    <div className="w-full h-screen flex flex-col items-center bg-white px-0 sm:px-2">
      <Header />
      {isLoading && <LoadingBar />}
      {isError && <ErrorModal />}
      <main
        className="max-w-[800px] min-w-[320px] w-full px-2 sm:px-4 pt-[80px] sm:pt-[120px] md:pt-[150px]
       mt-4 sm:mt-10 bg-white"
      >
        {children}
      </main>
    </div>
  );
};

export default BaseLayout;
