import { useMyDataQuery } from '@/services/queries/user.query';
import React, { useEffect } from 'react';

const Home = () => {
	return (
		<div className="flex flex-col items-center justify-center">
			{/* 검색창 */}
			<div className="flex items-center w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-sm">
				{/* <BiSearch className="text-gray-400 ml-4 text-xl" /> */}
				<div>icon</div>
				<input
					type="text"
					placeholder="검색할 내용을 입력해주세요."
					className="flex-1 p-2 text-gray-700 bg-transparent border-none focus:outline-none"
				/>
			</div>

			{/* 전체 카테고리 */}
			<div className="mt-8 text-center">
				<h2 className="text-lg font-bold">전체 카테고리</h2>
				<div className="flex justify-center gap-4 mt-4">
					{/* 버튼들 */}
					<CategoryButton icon="🔮" label="타로" />
					<CategoryButton icon="🔯" label="사주" />
					<CategoryButton icon="🌙" label="꿈해몽" />
					<CategoryButton icon="🤖" label="작명" />
				</div>
			</div>
		</div>
	);
};

export default Home;

const CategoryButton = ({ icon, label }: { icon: string; label: string }) => {
	return (
		<div className="flex flex-col items-center w-20 h-20 bg-purple-100 text-purple-600 font-semibold rounded-lg shadow-md hover:bg-purple-200 transition">
			<span className="text-3xl">{icon}</span>
			<span className="mt-1 text-sm">{label}</span>
		</div>
	);
};
