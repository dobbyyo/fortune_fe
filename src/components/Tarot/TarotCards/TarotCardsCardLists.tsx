import { getLocalStorage } from '@/lib/localStorage';
import { tarotCardsState } from '@/stores/useTarotCardStore';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const TarotCardsCardLists = () => {
  const [tarotCards, setTarotCards] = useRecoilState(tarotCardsState); // Recoil에서 카드 정보 가져오기
  const storedTarotCards = getLocalStorage('tarotCards'); // localStorage에서 카드 정보 가져오기

  useEffect(() => {
    if (storedTarotCards) {
      setTarotCards(storedTarotCards);
    }
  }, []);

  return (
    <div className="flex flex-col gap-8 mt-6">
      {tarotCards.map((card) => (
        <div key={card.id} className="flex flex-col items-center">
          <h3 className="mb-[17px] text-clamp30 font-bold text-center">{card.subTitle}</h3>

          <div className="w-[192px] h-[255px] sm:w-[320px] sm:h-[400px] bg-gray-300 rounded-md shadow-md flex items-center justify-center">
            <img src={card.image_url} alt={card.name} className="w-full h-full rounded-md" />
          </div>

          <p className="mt-[10px] text-clamp25 text-center font-medium">{card.name}</p>
        </div>
      ))}
    </div>
  );
};

export default TarotCardsCardLists;
