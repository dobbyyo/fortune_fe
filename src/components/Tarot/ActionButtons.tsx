import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { resetTriggerState, selectedCardsState } from '@/stores/useTarotCardStore';
import { tabState } from '@/stores/useTabStore';
import { useTarotCardInterpretationMutation } from '@/services/queries/tarot.query';
import { removeLocalStorage, setLocalStorage } from '@/lib/localStorage';

const ActionButtons = () => {
  const activeTab = useRecoilValue(tabState); // 현재 탭 상태 가져오기
  const [selectedCards, setSelectedCards] = useRecoilState(selectedCardsState);
  // 결과 버튼 활성화 여부: 모든 카드를 선택해야 활성화
  const isResultDisabled = selectedCards.some((card) => card === null);
  const setResetTrigger = useSetRecoilState(resetTriggerState);

  // 탭에 따른 subTitle 매핑
  const subTitles = (() => {
    switch (activeTab) {
      case '오늘의 타로':
        return ['애정운', '재물운', '학업운'];
      case '이달의 타로':
        return ['총운', '행운', '주의', '사건', '처세술'];
      case '연애 타로':
        return ['연애운'];
      case '취업 타로':
        return ['취업운'];
      default:
        return [];
    }
  })();
  const getRandomBoolean = () => Math.random() < 0.5;

  const handleReset = () => {
    // 선택된 카드를 초기화
    setResetTrigger((prev) => !prev);
    setSelectedCards(() => Array(subTitles.length).fill(null)); // subTitles 길이만큼 null 배열 생성
  };

  const { mutate } = useTarotCardInterpretationMutation();

  const handleSubmit = async () => {
    removeLocalStorage('tarotCards');

    // 중복되지 않는 랜덤 숫자 생성 함수
    const generateUniqueRandomIds = (count: number, max: number) => {
      const uniqueIds = new Set<number>();
      while (uniqueIds.size < count) {
        const randomId = Math.floor(Math.random() * max); // 0부터 max-1까지 랜덤 숫자
        uniqueIds.add(randomId);
      }
      return Array.from(uniqueIds);
    };

    // 랜덤 카드 ID 생성 (중복 방지)
    const randomCardIds = generateUniqueRandomIds(selectedCards.length, 64);

    // requestData 생성
    const requestData = randomCardIds.map((randomCardId, index) => ({
      cardId: randomCardId + 1, // 1부터 시작하도록 조정
      subTitle: subTitles[index], // subTitle 매핑
      isReversed: getRandomBoolean(), // 랜덤 boolean
    }));

    setLocalStorage('tarotBookmark', false);
    mutate(requestData);
  };

  return (
    <div className="mt-8 flex justify-center sm:gap-[109px] pb-20">
      <button
        onClick={handleReset}
        className="border-none btn w-[160px] h-[50px] sm:w-[195px] sm:h-[41px] px-2 sm:px-4 py-2 
				bg-[#787878] text-white rounded-none sm:rounded-[20px] hover:bg-[#808080] transition text-[20px] font-bold"
      >
        다시 선택하기
      </button>

      <button
        onClick={handleSubmit}
        className={`border-none btn w-[160px] h-[50px] sm:w-[195px] sm:h-[41px] px-2 sm:px-4 py-2 
					rounded-none sm:rounded-[20px] text-[20px] font-bold text-black ${
            isResultDisabled
              ? 'disabled:opacity-50 bg-[#d1d1d1] text-[#a1a1a1] cursor-not-allowed'
              : 'bg-[#DECEFF] hover:bg-[#d8ceeb] transition'
          }`}
      >
        결과보기
      </button>
    </div>
  );
};

export default ActionButtons;
