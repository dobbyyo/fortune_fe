import Header from '@/components/Header';
import { ReactNode } from 'react';

const BaseLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="w-full h-screen px-4 bg-base-100">
			<Header />
			<main className="flex-grow w-full max-w-[800px] mx-auto px-4">{children}</main>
		</div>
	);
};

export default BaseLayout;
