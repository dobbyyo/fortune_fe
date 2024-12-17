import { useGetTarotCardShareQuery } from '@/services/queries/tarot.query';
import { useParams } from 'react-router-dom';
import { CardSection } from '../TarotResult';

const TarotShareLists = () => {
  const { id } = useParams<{ id: string }>();

  const { data: useGetTarotCardShareData } = useGetTarotCardShareQuery(Number(id), {
    enabled: !!id,
  });

  return (
    <>
      {useGetTarotCardShareData &&
        useGetTarotCardShareData.shareCards.cards.map((card) => (
          <div key={card.id} className="flex flex-col items-center w-full">
            <h3 className="mb-4 text-clamp30 font-medium text-center">{card.sub_title}</h3>

            <div className="w-[192px] h-[255px] sm:w-[320px] sm:h-[400px] bg-gray-300 rounded-md shadow-md flex items-center justify-center">
              <img src={card.card.image_url} alt={card.card.name} className="w-full h-full rounded-md" />
            </div>

            <p className="mt-4 text-clamp30 font-medium  text-center">{card.card.name}</p>

            <CardSection title="🔥 카드 해석" content={card.card_interpretation} />
            <CardSection
              title="🔎 카드 의미"
              content={card.is_upright === true ? card.card.upright_meaning : card.card.reversed_meaning}
            />
          </div>
        ))}
    </>
  );
};

export default TarotShareLists;
