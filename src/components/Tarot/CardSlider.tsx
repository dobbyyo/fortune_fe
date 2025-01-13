import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dragPositionState, resetTriggerState, selectedCardsState } from '@/stores/useTarotCardStore';
import { ResponsiveImage } from '../Common';

const CardSlider = () => {
  const totalCards = 64;
  const sliderRef = useRef(null);
  const [selectedCards, setSelectedCards] = useRecoilState(selectedCardsState);
  const dragPosition = useRecoilValue(dragPositionState);
  const [resetTrigger, setResetTrigger] = useRecoilState(resetTriggerState);

  useEffect(() => {
    if (resetTrigger) {
      setSelectedCards(Array(selectedCards.length).fill(null));
      setResetTrigger(false);
    }
  }, [resetTrigger, setSelectedCards, selectedCards.length]);

  const handleCardClick = (index: number) => {
    if (!selectedCards.includes(null)) return;

    setSelectedCards((prev) => {
      if (prev.includes(index)) return prev;

      const nextState = [...prev];
      const nullIndex = nextState.findIndex((card) => card === null);

      if (nullIndex !== -1) {
        nextState[nullIndex] = index;
      }
      return nextState;
    });
  };

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
              className={`card-${index} relative w-[40px] h-[65px] sm:w-[60px] sm:h-[95px] cursor-pointer hover:scale-105 transition-transform ${
                selectedCards.includes(index) ? 'opacity-0 pointer-events-none' : ''
              }`}
              style={{
                opacity: selectedCards.includes(index) ? '0' : '1',
                transform: selectedCards.includes(index) ? 'translateY(150px) scale(0.5)' : 'none',
                transition: 'transform 0.5s, opacity 0.5s',
              }}
            >
              <ResponsiveImage
                webpSrc="/tarot/webp/tarot-back.webp"
                pngSrc="/tarot/png/tarot-back.png"
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
