import { type ReactElement } from 'react';
import { Navigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { authState } from '@/stores/useAuthStore';

interface Props {
	children: ReactElement;
}

const PublicRoute: React.FC<Props> = ({ children }) => {
	const isAuthenticated = useRecoilValue(authState);

	return isAuthenticated ? <Navigate to="/" /> : children;
};

export default PublicRoute;
