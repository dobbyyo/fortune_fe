import { memo } from 'react';
import CardSection from './CardSection';
import { TarotCard } from '@/types/tarotType';

const TarotResultLists = memo(({ card }: { card: TarotCard }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="mb-4 text-clamp30 font-medium text-center">{card.subTitle}</h3>
      <div className="w-[192px] h-[255px] sm:w-[320px] sm:h-[400px] bg-gray-300 rounded-md shadow-md flex items-center justify-center">
        <img src={card.image_url} alt={card.name} className="w-full h-full rounded-md" />
      </div>
      <p className="mt-4 text-clamp30 font-medium text-center">{card.name}</p>
      <CardSection title="🔥 카드 해석" content={card.interpretation.interpretation} />
      <CardSection title="🔎 카드 의미" content={card.interpretation.meaning} />
    </div>
  );
});

export default TarotResultLists;
