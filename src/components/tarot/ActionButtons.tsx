import { useRecoilValue, useSetRecoilState } from 'recoil';
import { resetTriggerState, selectedCardsState } from '@/stores/useTarotCardStore';

const ActionButtons = () => {
	const selectedCards = useRecoilValue(selectedCardsState);

	// 결과 버튼 활성화 여부: 모든 카드를 선택해야 활성화
	const isResultDisabled = selectedCards.some((card) => card === null);
	const setResetTrigger = useSetRecoilState(resetTriggerState);

	const handleReset = () => {
		setResetTrigger((prev) => !prev);
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
