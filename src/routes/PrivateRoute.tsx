import BaseLayout from '@/layouts/BaseLayout';
import { authState } from '@/stores/useAuthStore';
import { FC, type ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

interface Props {
	children: ReactElement;
}

const PrivateRoute: FC<Props> = ({ children }) => {
	const isAuthenticated = useRecoilValue(authState);

	return isAuthenticated ? <BaseLayout>{children}</BaseLayout> : <Navigate to="/login" />;
};

export default PrivateRoute;
