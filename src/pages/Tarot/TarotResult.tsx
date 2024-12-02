import { NavBar } from '@/components/Common';
import { cleanData } from '@/hooks/cleanData';
import { getLocalStorage } from '@/lib/localStorage';
import { tarotCardsState } from '@/stores/useTarotCardStore';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const TarotResult = () => {
  const [tarotCards, setTarotCards] = useRecoilState(tarotCardsState);
  const storedTarotCards = getLocalStorage('tarotCards');

  useEffect(() => {
    if (storedTarotCards) {
      setTarotCards(storedTarotCards);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-auto">
      <NavBar title="오늘의 타로" isResult={true} />

      <div className="flex flex-col gap-12 mt-8 w-full px-4 mb-[60px]">
        {tarotCards.map((card) => (
          <div key={card.id} className="flex flex-col items-center w-full">
            <h3 className="mb-4 text-clamp30 font-medium text-center">[{cleanData(card.subTitle)}]</h3>

            <div className="w-[192px] h-[255px] sm:w-[320px] sm:h-[400px] bg-gray-300 rounded-md shadow-md flex items-center justify-center">
              <img src={cleanData(card.image_url)} alt={cleanData(card.name)} className="w-full h-full rounded-md" />
            </div>

            <p className="mt-4 text-clamp30 font-medium  text-center">{cleanData(card.name)}</p>

            <div className="flex flex-col justify-center items-center w-[320px] sm:w-[600px] md:w-[700px] lg:w-[800px]">
              <div className="mt-4 text-start flex flex-col items-start w-full">
                <h4 className="text-clamp30 font-bold mb-[16px]">카드 해석</h4>
                <p className="text-clamp25 font-normal indent-2 mb-[30px]">
                  {cleanData(card.interpretation.interpretation)}
                </p>
              </div>

              <div className="mt-4 text-start flex flex-col items-start w-full">
                <h4 className="text-clamp30 font-bold mb-[16px]">카드 의미</h4>
                <p className="text-clamp25 font-normal indent-2  mb-[30px]">{cleanData(card.interpretation.meaning)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TarotResult;
