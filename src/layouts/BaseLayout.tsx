import Header from '@/components/Header/Header';
import { useCSRFQuery } from '@/services/queries/csrf.query';
import { ReactNode } from 'react';

const BaseLayout = ({ children }: { children: ReactNode }) => {
	useCSRFQuery();

	return (
		<div className="w-full h-screen flex flex-col items-center bg-white">
			<Header />
			<main className="max-w-[800px] min-w-[320px] w-full sm:px-4 pt-[80px] sm:pt-[120px] md:pt-[150px] bg-white">
				{children}
			</main>
		</div>
	);
};

export default BaseLayout;
