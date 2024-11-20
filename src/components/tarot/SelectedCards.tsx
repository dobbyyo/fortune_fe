import { useRecoilState, useRecoilValue } from 'recoil';
import { tabState, selectedCardsState, tabCategoriesState } from '@/stores/useTarotCardStore';
import { useEffect } from 'react';

const SelectedCards = () => {
	const activeTab = useRecoilValue(tabState);
	const categories = useRecoilValue(tabCategoriesState);
	const [selectedCards, setSelectedCards] = useRecoilState(selectedCardsState);

	const maxCards = categories.length;

	// 탭 변경 시 선택된 카드 상태를 초기화
	useEffect(() => {
		setSelectedCards(categories.map(() => null));
	}, [activeTab, categories, setSelectedCards]);

	return (
		<div className="mt-8">
			<div className="w-full flex justify-center items-center">
				<div className={`grid grid-cols-${maxCards} gap-6`}>
					{categories.map((category, index) => (
						<div key={index} className="text-center flex flex-col items-center">
							<div className="font-normal mb-2 text-[20px]">{category}</div>
							<div className={'w-[80px] h-[120px] bg-gray-300 rounded flex items-center justify-center shadow-md'}>
								{selectedCards[index] !== null ? (
									<img
										src="/card-back-icon.jpg"
										alt={`Selected Card ${index + 1}`}
										className="w-full h-full object-cover rounded"
									/>
								) : (
									<div className="w-[80px] h-[120px] bg-[#D9D9D9]" />
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SelectedCards;
