import { NavBar } from '@/components/Common';
import { MetaTag } from '@/components/Seo';
import { tarotMetaData } from '@/config/metaData';
import { cleanData } from '@/hooks/cleanData';
import { getLocalStorage } from '@/lib/localStorage';
import { useTarotCardBookmarkDeleteMutation, useTarotCardBookmarkMutation } from '@/services/queries/tarot.query';
import { authState, userState } from '@/stores/useAuthStore';
import { tarotCardsState } from '@/stores/useTarotCardStore';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const TarotResult = () => {
  const {
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
  } = tarotMetaData.tarotResult;

  const [tarotCards, setTarotCards] = useRecoilState(tarotCardsState);
  const storedTarotCards = getLocalStorage('tarotCards');
  const isAuthenticated = useRecoilValue(authState);
  const userData = useRecoilValue(userState);
  const isTarotBookmark = getLocalStorage('tarotBookmark');

  useEffect(() => {
    if (storedTarotCards) {
      setTarotCards(storedTarotCards);
    }
  }, []);

  const { mutate: bookMarkMutate } = useTarotCardBookmarkMutation();
  const { mutate: deleteBookmarkMutate } = useTarotCardBookmarkDeleteMutation();

  const onBookmark = () => {
    if (isAuthenticated.isAuthenticated && userData) {
      if (isTarotBookmark && isTarotBookmark.isBookmark) {
        const payload = {
          userId: Number(userData.id),
          savedCardId: Number(isTarotBookmark.id),
        };
        return deleteBookmarkMutate({ payload });
      }

      bookMarkMutate({
        payload: {
          userId: userData.id,
          mainTitle: '오늘의 타로',
          cards: tarotCards.map((card) => ({
            cardId: card.id,
            subTitle: card.subTitle,
            isReversed: card.isReversed,
            cardInterpretation: card.interpretation.interpretation,
          })),
        },
      });
    } else {
      alert('로그인이 필요한 서비스입니다.');
    }
  };

  return (
    <>
      <MetaTag
        title={metaTitle}
        description={metaDescription}
        keywords={keywords}
        canonical={canonical}
        ogTitle={ogTitle}
        ogDescription={ogDescription}
      />
      <div className="flex flex-col items-center justify-center h-auto">
        <NavBar title="오늘의 타로" isResult={true} onBookmark={onBookmark} isBookmark={isTarotBookmark} />

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
                  <div className="bg-[#D9D9D9] w-full float-start justify-center items-center  mb-[16px] py-2 pl-2">
                    <h4 className="text-clamp30 font-bold">🔥 카드 해석</h4>
                  </div>
                  <p className="text-clamp25 font-normal indent-2 mb-[30px]">
                    {cleanData(card.interpretation.interpretation)}
                  </p>
                </div>

                <div className="mt-4 text-start flex flex-col items-start w-full">
                  <div className="bg-[#D9D9D9] w-full float-start justify-center items-center  mb-[16px] py-2 pl-2">
                    <h4 className="text-clamp30 font-bold">🔎 카드 의미</h4>
                  </div>
                  <p className="text-clamp25 font-normal indent-2  mb-[30px]">
                    {cleanData(card.interpretation.meaning)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TarotResult;
