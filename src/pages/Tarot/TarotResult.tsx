import { NavBar } from '@/components/Common';
import { MetaTag } from '@/components/Seo';
import { TarotResultLists } from '@/components/Tarot/TarotResult';
import { tarotMetaData } from '@/config/metaData';
import { cleanData } from '@/hooks/cleanData';
import { getLocalStorage } from '@/lib/localStorage';
import {
  useTarotCardBookmarkDeleteMutation,
  useTarotCardBookmarkMutation,
  useTarotCardShareMutation,
} from '@/services/queries/tarot.query';
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

  const storedTarotCards = getLocalStorage('tarotCards') || [];
  const isTarotBookmark = getLocalStorage('tarotBookmark');
  const isAuthenticated = useRecoilValue(authState);
  const userData = useRecoilValue(userState);
  const [tarotCards, setTarotCards] = useRecoilState(tarotCardsState);

  useEffect(() => {
    setTarotCards((prev) => (prev.length ? prev : storedTarotCards));
  }, [storedTarotCards, setTarotCards]);

  const { mutate: bookMarkMutate } = useTarotCardBookmarkMutation();
  const { mutate: deleteBookmarkMutate } = useTarotCardBookmarkDeleteMutation();
  const { mutate: shareTarotCards } = useTarotCardShareMutation();

  const createPayload = () => ({
    mainTitle: '오늘의 타로',
    cards: tarotCards.map((card) => ({
      cardId: card.id,
      subTitle: card.subTitle,
      isReversed: card.isReversed,
      cardInterpretation: card.interpretation.interpretation,
    })),
  });

  const onBookmark = () => {
    if (!isAuthenticated.isAuthenticated || !userData) {
      return alert('로그인이 필요한 서비스입니다.');
    }

    if (isTarotBookmark?.isBookmark) {
      deleteBookmarkMutate({
        payload: { userId: userData.id, savedCardId: isTarotBookmark.id },
      });
    } else {
      bookMarkMutate({
        payload: { ...createPayload(), userId: userData.id },
      });
    }
  };

  const onShare = () => {
    shareTarotCards({ payload: createPayload() });
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
        <NavBar
          title="오늘의 타로"
          isResult={true}
          onBookmark={onBookmark}
          isBookmark={isTarotBookmark}
          onShare={onShare}
        />

        <div className="flex flex-col gap-12 mt-8 w-full px-4 mb-[60px]">
          {tarotCards.map((card) => (
            <TarotResultLists key={card.id} card={card} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TarotResult;
