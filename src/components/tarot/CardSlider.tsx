import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dragPositionState, resetTriggerState, selectedCardsState } from '@/stores/useTarotCardStore';

const CardSlider = () => {
	const totalCards = 78;
	const sliderRef = useRef(null);
	const [selectedCards, setSelectedCards] = useRecoilState(selectedCardsState);
	const dragPosition = useRecoilValue(dragPositionState);
	const [resetTrigger, setResetTrigger] = useRecoilState(resetTriggerState);

	useEffect(() => {
		// 리셋 트리거가 활성화되면 카드 상태 초기화
		if (resetTrigger) {
			setSelectedCards(selectedCards.map(() => null));
			document.querySelectorAll('.hidden').forEach((card) => {
				card.classList.remove('hidden');
				(card as HTMLElement).style.opacity = '1';
				(card as HTMLElement).style.transform = 'none';
			});
			setResetTrigger(false);
		}
	}, [resetTrigger, setSelectedCards]);

	// 드래그 위치와 슬라이더 연동
	useEffect(() => {
		if (sliderRef.current) {
			const swiperInstance = sliderRef.current.swiper;
			const slideIndex = Math.floor((dragPosition / 100) * totalCards);
			swiperInstance.slideTo(slideIndex);
		}
	}, [dragPosition, totalCards]);

	const handleCardClick = (index: number) => {
		if (!selectedCards.includes(null)) return;

		const card = document.querySelector(`.card-${index}`) as HTMLElement;

		if (card) {
			card.style.opacity = '0';
			card.style.transition = 'transform 0.5s, opacity 0.5s';
			card.style.transform = 'translateY(150px) scale(0.5)';
			setTimeout(() => {
				card.classList.add('hidden');
			}, 500);
		}

		setSelectedCards((prev) => {
			// null이 아닌 index가 이미 배열에 있는 경우 무시
			if (prev.includes(index)) return prev;

			// 첫 번째 null의 위치를 찾아 해당 자리에 index를 삽입
			const nextState = [...prev];
			const nullIndex = nextState.findIndex((card) => card === null);

			if (nullIndex !== -1) {
				nextState[nullIndex] = index;
			}

			return nextState;
		});
	};

	return (
		<div className="w-full max-w-[800px] mx-auto p-4">
			<Swiper
				ref={sliderRef}
				modules={[Navigation, Pagination]}
				spaceBetween={-66}
				slidesPerView={20}
				grabCursor={false}
				navigation={false}
				pagination={false}
			>
				{Array.from({ length: totalCards }).map((_, index) => (
					<SwiperSlide key={index}>
						<div
							onClick={() => handleCardClick(index)}
							className={`card-${index} relative w-[60px] h-[95px] cursor-pointer hover:scale-105 transition-transform ${
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
		</div>
	);
};

export default CardSlider;
