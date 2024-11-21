import Header from '@/components/Header/Header';
import { ReactNode } from 'react';

const BaseLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="w-full h-screen flex flex-col items-center">
			<Header />
			<main className="max-w-[800px] min-w-[320px] w-full px-4 pt-[186px]">{children}</main>
		</div>
	);
};

export default BaseLayout;
