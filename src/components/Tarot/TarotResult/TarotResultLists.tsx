import { memo } from 'react';
import CardSection from './CardSection';
import { TarotCard } from '@/types/tarotType';
import { ResponsiveImage } from '@/components/Common';

const TarotResultLists = memo(({ card }: { card: TarotCard }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="mb-4 bigText font-medium text-center">{card.subTitle}</h3>
      <div className="h-full bg-gray-300 rounded-md shadow-md flex items-center justify-center">
        <ResponsiveImage webpSrc={card.image_url} pngSrc={card.image_url} alt={card.name} className="object-contain" />
      </div>
      <p className="mt-4 mediumText font-medium text-center">{card.name}</p>
      <CardSection title="🔥 카드 해석" content={card.interpretation.interpretation} />
      <CardSection title="🔎 카드 의미" content={card.interpretation.meaning} />
    </div>
  );
});

export default TarotResultLists;
