import { LoadingBar } from '@/components/Common';
import { useGetDetailTarotBookmark } from '@/services/queries/myPage.query';
import { userIdSelector } from '@/stores/useAuthStore';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const BookmarkTarotCardsList = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const tarotCardId = queryParams.get('tarotCardId');

  const userId = useRecoilValue(userIdSelector);

  const { data: savedTarotCardsData, isLoading: savedTarotCardsLoading } = useGetDetailTarotBookmark(
    {
      userId: Number(userId),
      tarotCardId: Number(tarotCardId),
    },
    {
      enabled: userId !== undefined && tarotCardId !== undefined,
    },
  );

  if (savedTarotCardsLoading) {
    return <LoadingBar />;
  }

  return (
    <div className="flex flex-col gap-12 mt-8 w-full px-4 mb-[60px]">
      {savedTarotCardsData &&
        savedTarotCardsData.savedTarotCardsResults.map((card) => (
          <div key={card.id} className="flex flex-col items-center w-full">
            <h3 className="mb-4 text-clamp30 font-medium text-center">[{card.subTitle}]</h3>

            <div className="w-[192px] h-[255px] sm:w-[320px] sm:h-[400px] bg-gray-300 rounded-md shadow-md flex items-center justify-center">
              <img src={card.imgUrl} alt={card.cardName} className="w-full h-full rounded-md" />
            </div>

            <p className="mt-4 text-clamp30 font-medium  text-center">{card.cardName}</p>

            <div className="flex flex-col justify-center items-center w-full">
              <div className="mt-4 text-start flex flex-col items-start w-full">
                <div className="bg-[#D9D9D9] w-full float-start justify-center items-center  mb-[16px] py-2 pl-2">
                  <h4 className="text-clamp30 font-bold">🔥 카드 해석</h4>
                </div>
                <p className="text-clamp25 font-normal indent-2 mb-[30px]">{card.cardInterpretation}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BookmarkTarotCardsList;
