import { NavBar } from '@/components/Common';
import { MetaTag } from '@/components/Seo';
import { useGetTarotCardShareQuery } from '@/services/queries/tarot.query';
import { useParams } from 'react-router-dom';

const TarotShare = () => {
  const { id } = useParams<{ id: string }>();

  console.log(id);
  const { data: useGetTarotCardShareData } = useGetTarotCardShareQuery(Number(id), {
    enabled: !!id,
  });

  return (
    <>
      <MetaTag title="타로 공유하기" description="타로 카드를 공유합니다." keywords="타로, 타로카드, 타로공유" />
      <div className="flex flex-col items-center justify-center h-auto">
        <NavBar title="오늘의 타로" isResult={false} isBookmark={false} />

        {useGetTarotCardShareData &&
          useGetTarotCardShareData.shareCards.cards.map((card) => (
            <div key={card.id} className="flex flex-col items-center w-full">
              <h3 className="mb-4 text-clamp30 font-medium text-center">{card.sub_title}</h3>

              <div className="w-[192px] h-[255px] sm:w-[320px] sm:h-[400px] bg-gray-300 rounded-md shadow-md flex items-center justify-center">
                <img src={card.card.image_url} alt={card.card.name} className="w-full h-full rounded-md" />
              </div>

              <p className="mt-4 text-clamp30 font-medium  text-center">{card.card.name}</p>

              <div className="flex flex-col justify-center items-center w-[320px] sm:w-[600px] md:w-[700px] lg:w-[800px]">
                <div className="mt-4 text-start flex flex-col items-start w-full">
                  <div className="bg-[#D9D9D9] w-full float-start justify-center items-center  mb-[16px] py-2 pl-2">
                    <h4 className="text-clamp30 font-bold">🔥 카드 해석</h4>
                  </div>
                  <p className="text-clamp25 font-normal indent-2 mb-[30px]">{card.card_interpretation}</p>
                </div>

                <div className="mt-4 text-start flex flex-col items-start w-full">
                  <div className="bg-[#D9D9D9] w-full float-start justify-center items-center  mb-[16px] py-2 pl-2">
                    <h4 className="text-clamp30 font-bold">🔎 카드 의미</h4>
                  </div>
                  <p className="text-clamp25 font-normal indent-2  mb-[30px]">
                    {card.is_upright === true ? card.card.upright_meaning : card.card.reversed_meaning}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default TarotShare;
