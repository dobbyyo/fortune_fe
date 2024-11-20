import { useRef, useState } from 'react';
import gsap from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

const Home = () => {
	const totalCards = 78;
	const sliderRef = useRef(null); // Swiper 인스턴스 참조
	const trackRef = useRef(null); // 보라색 줄 참조
	const [dragging, setDragging] = useState(false);
	const [dragPosition, setDragPosition] = useState(0); // 드래그 아이콘 위치
	const [selectedCards, setSelectedCards] = useState<(number | null)[]>([null, null, null]); // 각 운세별 선택된 카드
	const categories = ['애정운', '재물운', '학업&취업운']; // 운세 카테고리

	const handleReset = () => {
		// 선택 초기화
		setSelectedCards([null, null, null]);
		document.querySelectorAll('.card').forEach((card) => {
			card.classList.remove('hidden'); // 선택된 카드 복원
			card.style.opacity = '1';
			card.style.transform = 'translateY(0) scale(1)';
		});
	};

	const handleCardClick = (index: number) => {
		// 빈 운세 칸에만 추가
		const firstEmptyIndex = selectedCards.findIndex((card) => card === null);
		if (firstEmptyIndex === -1 || selectedCards.includes(index)) return;

		const updatedCards = [...selectedCards];
		updatedCards[firstEmptyIndex] = index;
		setSelectedCards(updatedCards);

		// 카드 애니메이션
		const card = document.querySelector(`.card-${index}`);
		if (card) {
			card.style.opacity = '0';
			card.style.transition = 'transform 0.5s, opacity 0.5s';
			card.style.transform = 'translateY(150px) scale(0.5)';
			setTimeout(() => {
				card.classList.add('hidden'); // 애니메이션 후 숨기기
			}, 500);
		}
	};

	const handleDragStart = (e) => {
		setDragging(true);
	};

	const handleDragMove = (e: React.MouseEvent) => {
		if (!dragging || !trackRef.current) return;

		const trackRect = trackRef.current.getBoundingClientRect();
		const newPosition = Math.min(
			Math.max(0, e.clientX - trackRect.left), // 아이콘이 보라색 줄의 왼쪽 경계를 넘지 않도록
			trackRect.width, // 아이콘이 보라색 줄의 오른쪽 경계를 넘지 않도록
		);

		setDragPosition(newPosition);

		// 슬라이더와 연동
		if (sliderRef.current) {
			const swiperInstance = sliderRef.current.swiper;
			const progress = newPosition / trackRect.width; // 드래그 위치를 0~1 사이로 변환
			swiperInstance.slideTo(Math.floor(progress * totalCards));
		}
	};

	const handleDragEnd = () => {
		setDragging(false);
	};

	return (
		<div className="w-full max-w-[800px] mx-auto pt-[186px]">
			<div className="w-full max-w-[800px] mx-auto p-4">
				<Swiper
					ref={sliderRef} // Swiper 인스턴스 참조
					modules={[Navigation, Pagination]}
					spaceBetween={-66} // 카드가 2/3 정도 겹치도록 음수 간격 설정
					slidesPerView={20}
					grabCursor={false} // 손 모양 커서 비활성화
					navigation={false} // 화살표 비활성화
					pagination={false} // 하단 점 비활성화
				>
					{Array.from({ length: totalCards }).map((_, index) => (
						<SwiperSlide key={index}>
							<div
								onClick={() => handleCardClick(index)}
								className={`relative w-[60px] h-[95px] cursor-pointer hover:scale-105 transition-transform ${
									selectedCards.includes(index) ? 'opacity-0 pointer-events-none' : ''
								}`}
							>
								<img
									src="/card-back-icon.jpg"
									alt={`Card ${index + 1}`}
									className="w-full h-full object-cover rounded shadow-md"
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				<div
					ref={trackRef}
					className="relative mt-4 h-[5px] bg-purple-500 rounded cursor-pointer"
					onMouseDown={handleDragStart}
					onMouseMove={handleDragMove}
					onMouseUp={handleDragEnd}
					onMouseLeave={handleDragEnd}
				>
					<img
						src="/drag-icon.svg"
						alt="Drag Icon"
						className="absolute top-[-15px] w-[40px] h-[30px] -translate-x-1/2"
						style={{ left: `${dragPosition}px` }} // 드래그 위치에 따라 아이콘 위치 업데이트
						draggable={false} // 기본 HTML 드래그 방지
					/>
				</div>

				{/* 선택된 카드 영역 */}
				<div className="mt-8 grid grid-cols-3 gap-4">
					{categories.map((category, index) => (
						<div key={index} className="text-center flex flex-col justify-center items-center">
							<div className="text-gray-600 font-bold mb-2">{category}</div>
							<div
								className={`w-[60px] h-[95px] bg-gray-300 rounded flex items-center justify-center shadow-md ${
									selectedCards[index] !== null ? '' : 'border-2 border-dashed border-gray-400'
								}`}
							>
								{selectedCards[index] !== null ? (
									<img
										src="/card-back-icon.jpg"
										alt={`Selected Card ${selectedCards[index]! + 1}`}
										className="w-full h-full object-cover rounded"
									/>
								) : (
									<div className="text-sm text-gray-500"></div>
								)}
							</div>
						</div>
					))}
				</div>

				{/* 버튼 영역 */}
				<div className="mt-8 flex justify-center gap-4">
					<button
						onClick={handleReset}
						className="px-4 py-2 bg-gray-200 rounded text-gray-800 hover:bg-gray-300 transition"
					>
						다시 선택하기
					</button>
					<button
						disabled={selectedCards.includes(null)} // 모든 카드가 선택되지 않았다면 비활성화
						className={`px-4 py-2 rounded ${
							selectedCards.includes(null)
								? 'bg-gray-300 text-gray-500 cursor-not-allowed'
								: 'bg-purple-500 text-white hover:bg-purple-600 transition'
						}`}
					>
						결과보기
					</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
