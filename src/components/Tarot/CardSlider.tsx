import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dragPositionState, resetTriggerState, selectedCardsState } from '@/stores/useTarotCardStore';

const CardSlider = () => {
  const totalCards = 64;
  const sliderRef = useRef(null);
  const [selectedCards, setSelectedCards] = useRecoilState(selectedCardsState);
  // const [dragPosition, setDragPosition] = useRecoilState(dragPositionState); // DragControl의 상태와 연동
  const dragPosition = useRecoilValue(dragPositionState);
  const [resetTrigger, setResetTrigger] = useRecoilState(resetTriggerState);

  useEffect(() => {
    // 리셋 트리거가 활성화되면 카드 상태 초기화
    if (resetTrigger) {
      setSelectedCards(Array(selectedCards.length).fill(null)); // 상태 초기화
      setResetTrigger(false); // 트리거 초기화
    }
  }, [resetTrigger, setSelectedCards, selectedCards.length]);

  const handleCardClick = (index: number) => {
    if (!selectedCards.includes(null)) return; // 모든 카드가 선택된 경우 무시

    setSelectedCards((prev) => {
      if (prev.includes(index)) return prev; // 중복된 선택 무시

      const nextState = [...prev];
      const nullIndex = nextState.findIndex((card) => card === null); // null 위치 찾기

      if (nullIndex !== -1) {
        nextState[nullIndex] = index; // 선택된 index 추가
      }
      return nextState;
    });
  };

  // useEffect(() => {
  //   if (sliderRef.current) {
  //     const swiperInstance = (sliderRef.current as any).swiper;

  //     // 슬라이더의 전체 길이와 마지막 카드 위치 계산
  //     const slidesGrid = swiperInstance.slidesGrid;
  //     const maxPosition = slidesGrid[slidesGrid.length - 1]; // 마지막 카드 위치
  //     const viewportWidth = swiperInstance.width; // 슬라이더의 뷰포트 크기

  //     // 마지막 카드가 오른쪽에 맞춰지도록 위치 보정
  //     const adjustedMaxPosition = maxPosition - viewportWidth;

  //     // 드래그 포지션을 슬라이더 위치로 변환
  //     const slidePosition = (dragPosition / 100) * adjustedMaxPosition;
  //     swiperInstance.setTranslate(-Math.min(slidePosition, adjustedMaxPosition)); // 슬라이더 이동

  //     // 슬라이더 이동 이벤트 처리
  //     swiperInstance.on('slideChange', () => {
  //       const currentIndex = swiperInstance.activeIndex; // 현재 슬라이더의 인덱스
  //       const newDragPosition = (currentIndex / (totalCards - 1)) * 100; // 드래그 컨트롤 위치 계산
  //       setDragPosition(newDragPosition); // 드래그 위치 업데이트
  //     });
  //   }
  // }, [dragPosition, setDragPosition, totalCards]);
  useEffect(() => {
    if (sliderRef.current) {
      const swiperInstance = (sliderRef.current as any).swiper;
      const slideIndex = Math.floor((dragPosition / 100) * totalCards);
      swiperInstance.slideTo(slideIndex);
    }
  }, [dragPosition, totalCards]);
  return (
    <div className="w-full sm:p-4">
      <Swiper
        ref={sliderRef}
        modules={[Navigation, Pagination]}
        grabCursor={false}
        navigation={false}
        pagination={false}
        breakpoints={{
          320: {
            slidesPerView: 12,
            spaceBetween: -10,
          },
          640: {
            slidesPerView: 20,
            spaceBetween: -66,
          },
        }}
      >
        {Array.from({ length: totalCards }).map((_, index) => (
          <SwiperSlide key={index}>
            <div
              onClick={() => handleCardClick(index)}
              className={`card-${index} relative w-[60px] h-[95px] cursor-pointer hover:scale-105 transition-transform ${
                selectedCards.includes(index) ? 'opacity-0 pointer-events-none' : ''
              }`}
              style={{
                opacity: selectedCards.includes(index) ? '0' : '1',
                transform: selectedCards.includes(index) ? 'translateY(150px) scale(0.5)' : 'none',
                transition: 'transform 0.5s, opacity 0.5s',
              }}
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
