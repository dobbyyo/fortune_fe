import { LoadingBar } from '@/components/Common';
import BaseLayout from '@/layouts/BaseLayout';
import { useMyDataQuery } from '@/services/queries/user.query';
import { FC, type ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: ReactElement;
}

const PrivateRoute: FC<Props> = ({ children }) => {
  const { data, isLoading } = useMyDataQuery(); // 인증 정보 로드

  if (isLoading) {
    return <LoadingBar />;
  }
  return data ? <BaseLayout>{children}</BaseLayout> : <Navigate to="/login" />;
};

export default PrivateRoute;
