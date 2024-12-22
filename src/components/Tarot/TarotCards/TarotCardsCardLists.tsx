import { ResponsiveImage } from '@/components/Common';
import { getLocalStorage } from '@/lib/localStorage';
import { tarotCardsState } from '@/stores/useTarotCardStore';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const TarotCardsCardLists = () => {
  const [tarotCards, setTarotCards] = useRecoilState(tarotCardsState);
  const storedTarotCards = getLocalStorage('tarotCards');

  useEffect(() => {
    if (storedTarotCards) {
      setTarotCards(storedTarotCards);
    }
  }, []);

  return (
    <div className="flex flex-col mt-6 gap-10 ">
      {tarotCards.map((card) => (
        <div key={card.id} className="flex flex-col items-center">
          <h3 className="mb-[17px] text-clamp30 font-bold text-center">{card.subTitle}</h3>

          <div className="h-full bg-gray-300 rounded-md shadow-md flex items-center justify-center">
            <ResponsiveImage
              webpSrc={card.image_url}
              pngSrc={card.image_url}
              alt={card.name}
              className="h-full object-contain"
            />
          </div>

          <p className="mt-[10px] text-clamp20 text-center font-medium">{card.name}</p>
        </div>
      ))}
    </div>
  );
};

export default TarotCardsCardLists;
