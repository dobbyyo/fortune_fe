import { FC, type ReactElement } from 'react';
import BaseLayout from '@/layouts/BaseLayout';

interface Props {
	children: ReactElement;
}

const PublicRoute: FC<Props> = ({ children }) => {
	return <BaseLayout>{children}</BaseLayout>;
};

export default PublicRoute;
