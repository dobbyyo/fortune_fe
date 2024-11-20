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
		<div className="mt-8 flex justify-center gap-[109px] pb-20">
			<button
				onClick={handleReset}
				className="border-none btn w-[195px] h-[41px] px-4 py-2 bg-[#D9D9D9] rounded-[20px]
				 hover:bg-gray-300 transition text-[20px] font-medium"
			>
				다시 선택하기
			</button>

			<button
				className={`border-none btn w-[195px] h-[41px] px-4 py-2 rounded-[20px] text-[20px] font-medium ${
					isResultDisabled
						? 'bg-purple-300 text-white cursor-not-allowed'
						: 'bg-purple-500 text-white hover:bg-purple-600 transition'
				}`}
			>
				결과보기
			</button>
		</div>
	);
};

export default ActionButtons;
