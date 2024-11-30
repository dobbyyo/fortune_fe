const Home = () => {
	return (
		<div className="flex flex-col items-center justify-center">
			<div className="px-2 flex items-center w-full h-[60px] sm:h-[70px] md:h-[84px] bg-white border border-[#404040] rounded-[5px]">
				<div>
					<img
						src="/search-icon.jpg"
						alt="검색 아이콘"
						className="w-[30px] h-[40px] sm:w-[50px] sm:h-[60px] md:w-[60px] md:h-[70px] ml-2"
					/>
				</div>
				<input
					type="text"
					placeholder="검색할 내용을 입력해주세요."
					className="flex-1 p-2 text-gray-700 bg-transparent border-none 
						focus:outline-none text-clamp30 
    				placeholder:text-clamp30 placeholder:font-normal"
				/>
			</div>

			<div className="mt-[50px] w-full">
				<h2 className="font-bold flex justify-start text-clamp50">전체 카테고리</h2>
				<div className="flex justify-center gap-4 mt-4">
					<CategoryButton icon="/mainTarot.svg" label="타로" />
					<CategoryButton icon="/mainSaju.svg" label="사주" />
					<CategoryButton icon="/mainDream.svg" label="꿈해몽" />
					<CategoryButton icon="/mainNaming.svg" label="작명" />
				</div>
			</div>
		</div>
	);
};

export default Home;

const CategoryButton = ({ icon, label }: { icon: string; label: string }) => {
	console.log(icon, label);
	return (
		<div className="flex flex-col items-center justify-center w-[100px] h-[100px] bg-purple-100 text-purple-600 font-semibold rounded-lg shadow-md hover:bg-purple-200 transition">
			<img className="w-[45px] h-[45px]" src={icon} alt="label icon picture" />
			<span className="mt-1 text-clamp30 text-black font-normal">{label}</span>
		</div>
	);
};

{
	/* <h1 className="text-clamp30">This text adjusts between 25px and 30px</h1> */
}
