import { useTarotCardInterpretationMutation } from '@/services/queries/tarot.query';
import { tarotCardsState } from '@/stores/useTarotCardStore';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

const TarotCardsActionButton = () => {
  const tarotCards = useRecoilValue(tarotCardsState);

  const { mutate } = useTarotCardInterpretationMutation();

  const handleMutate = () => {
    if (tarotCards.length) {
      mutate(
        tarotCards.map((card) => ({
          cardId: card.id,
          subTitle: card.subTitle,
          isReversed: card.isReversed,
        })),
      );
    }
  };

  useEffect(() => {
    handleMutate();
  }, []);

  return (
    <div className="w-full flex justify-center mt-8 px-2">
      <button
        onClick={handleMutate}
        className="bg-[#A47AF1] text-white mediumText font-medium py-2 mb-[40px]
    rounded-[30px] hover:bg-purple-400 transition w-[320px] sm:w-[400px]"
      >
        결과보기
      </button>
    </div>
  );
};

export default TarotCardsActionButton;
