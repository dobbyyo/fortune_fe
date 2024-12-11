import { LoadingBar } from '@/components/Common';
import BaseLayout from '@/layouts/BaseLayout';
import { useCheckAuthQuery } from '@/services/queries/auth.query';
import { FC, type ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: ReactElement;
}

const PrivateRoute: FC<Props> = ({ children }) => {
  const { data: checkLogin, isLoading: isCheckingLogin, isFetched } = useCheckAuthQuery();

  // 로딩 중 또는 아직 데이터가 준비되지 않은 경우
  if (isCheckingLogin || !isFetched) {
    return <LoadingBar />;
  }

  return checkLogin && checkLogin.status === 200 ? (
    <BaseLayout>{children}</BaseLayout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
