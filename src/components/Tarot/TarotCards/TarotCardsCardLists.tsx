import { LoadingBar, ResponsiveImage } from '@/components/Common';
import { useTarotCardsDrawQuery } from '@/services/queries/tarot.query';
import { tabState, tarotCardsState } from '@/stores/useTarotCardStore';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const TarotCardsCardLists = () => {
  const activeTab = useRecoilValue(tabState);
  const setTarotCards = useSetRecoilState(tarotCardsState);
  const { data: tarotCards, isLoading } = useTarotCardsDrawQuery({
    mainTitle: activeTab,
  });

  useEffect(() => {
    if (tarotCards) setTarotCards(tarotCards?.tarotCards);
  }, [tarotCards]);

  if (isLoading) {
    return <LoadingBar />;
  }

  return (
    <div className="flex flex-col mt-6 gap-10 ">
      {tarotCards?.tarotCards.map((card) => (
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
