import { NavBar } from '@/components/Common';
import { cleanData } from '@/hooks/cleanData';
import { getLocalStorage } from '@/lib/localStorage';
import { tarotCardsState } from '@/stores/useTarotCardStore';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const TarotCard = () => {
	const navigate = useNavigate();
	const [tarotCards, setTarotCards] = useRecoilState(tarotCardsState); // Recoil에서 카드 정보 가져오기
	const storedTarotCards = getLocalStorage('tarotCards'); // localStorage에서 카드 정보 가져오기

	useEffect(() => {
		if (storedTarotCards) {
			setTarotCards(storedTarotCards);
		}
	}, []);

	const goTarotResultPage = useCallback(() => {
		navigate('/tarot/result');
	}, []);

	return (
		<div className="flex flex-col items-center justify-center">
			<NavBar title="오늘의 타로" />

			<h2 className="mt-4 text-xl font-bold text-center">선택한 카드의 결과를 확인해 보세요.</h2>

			<div className="flex flex-col gap-8 mt-6">
				{tarotCards.map((card) => (
					<div key={card.id} className="flex flex-col items-center">
						<h3 className="mb-[17px] text-clamp30 font-medium text-center">[{cleanData(card.subTitle)}]</h3>

						<div className="w-[192px] h-[255px] sm:w-[320px] sm:h-[400px] bg-gray-300 rounded-md shadow-md flex items-center justify-center">
							<img src={cleanData(card.image_url)} alt={cleanData(card.name)} className="w-full h-full rounded-md" />
						</div>

						<p className="mt-[10px] text-clamp25 text-center">{cleanData(card.name)}</p>
					</div>
				))}
			</div>

			<div className="w-full flex justify-center mt-8">
				<button
					onClick={goTarotResultPage}
					className="bg-[#A47AF1] text-white text-clamp30 font-medium py-2 mb-[40px]
            rounded-[30px] hover:bg-purple-400 transition w-[320px] sm:w-[400px]"
				>
					결과보기
				</button>
			</div>
		</div>
	);
};

export default TarotCard;
