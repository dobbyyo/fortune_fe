import { useRecoilState, useRecoilValue } from 'recoil';
import { tabState, selectedCardsState, tabCategoriesState } from '@/stores/useTarotCardStore';
import { useEffect } from 'react';
import { ResponsiveImage } from '../Common';

const SelectedCards = () => {
  const activeTab = useRecoilValue(tabState);
  const categories = useRecoilValue(tabCategoriesState);
  const [selectedCards, setSelectedCards] = useRecoilState(selectedCardsState);

  // 탭 변경 시 선택된 카드 상태를 초기화
  useEffect(() => {
    setSelectedCards(categories.map(() => null));
  }, [activeTab, categories, setSelectedCards]);

  return (
    <div className="mt-8">
      <div className="w-full flex justify-center items-center">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {categories.map((category, index) => (
            <div key={index} className="text-center flex flex-col items-center">
              <div
                className={`font-normal mb-2 text-clamp20 ${activeTab === '오늘의 타로' && 'w-[94px] sm:w-[120px]'}`}
              >
                {category}
              </div>
              <div className={'w-[60px] h-[95px] bg-[#D9D9D9] rounded flex items-center justify-center shadow-md'}>
                {selectedCards[index] !== null ? (
                  <ResponsiveImage
                    webpSrc="/tarot/webp/tarot-back.webp"
                    pngSrc="/tarot/png/tarot-back.png"
                    alt={`Card ${index + 1}`}
                    className="w-[60px] h-full object-cover rounded"
                  />
                ) : (
                  <div className="w-[60px] h-[95px] object-cover rounded" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
// "font-normal mb-2 text-clamp20"
export default SelectedCards;
