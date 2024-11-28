import Header from '@/components/Header/Header';
import { useCSRFQuery } from '@/services/queries/csrf.query';
import { useMyDataQuery } from '@/services/queries/user.query';
import { ReactNode, useEffect } from 'react';

const BaseLayout = ({ children }: { children: ReactNode }) => {
	useCSRFQuery();

	return (
		<div className="w-full h-screen flex flex-col items-center bg-white">
			<Header />
			<main className="max-w-[800px] min-w-[320px] w-full px-4 pt-[186px] bg-white">{children}</main>
		</div>
	);
};

export default BaseLayout;
