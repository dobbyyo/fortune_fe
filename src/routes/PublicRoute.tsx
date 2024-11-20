import { type ReactElement } from 'react';
import BaseLayout from '@/layouts/BaseLayout';

interface Props {
	children: ReactElement;
}

const PublicRoute: React.FC<Props> = ({ children }) => {
	// const isAuthenticated = useRecoilValue(authState);

	return <BaseLayout>{children}</BaseLayout>;
};

export default PublicRoute;
