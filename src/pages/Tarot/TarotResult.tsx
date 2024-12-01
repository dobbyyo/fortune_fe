import { NavBar } from '@/components/Common';
import { cleanData } from '@/hooks/cleanData';
import { getLocalStorage } from '@/lib/localStorage';
import { tarotCardsState } from '@/stores/useTarotCardStore';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const TarotResult = () => {
	const [tarotCards, setTarotCards] = useRecoilState(tarotCardsState);
	const storedTarotCards = getLocalStorage('tarotCards');

	useEffect(() => {
		if (storedTarotCards) {
			setTarotCards(storedTarotCards);
		}
	}, []);

	return (
		<div className="flex flex-col items-center justify-center h-auto">
			<NavBar title="오늘의 타로" />

			<div className="flex flex-col gap-12 mt-8 w-full px-4">
				{tarotCards.map((card) => (
					<div key={card.id} className="flex flex-col items-center w-full">
						{/* SubTitle */}
						<h3 className="mb-4 text-clamp30 font-medium text-center">[{cleanData(card.subTitle)}]</h3>

						{/* Image */}
						<div className="w-[192px] h-[255px] sm:w-[320px] sm:h-[400px] bg-gray-300 rounded-md shadow-md flex items-center justify-center">
							<img src={cleanData(card.image_url)} alt={cleanData(card.name)} className="w-full h-full rounded-md" />
						</div>

						{/* Name */}
						<p className="mt-4 text-clamp30 font-medium  text-center">{cleanData(card.name)}</p>

						<div className="flex flex-col justify-center items-center w-[800px]">
							{/* Interpretation */}
							<div className="mt-4 text-start">
								<h4 className="text-clamp30 font-bold mb-2">카드 해석</h4>
								<p className="text-clamp25 font-normal">{cleanData(card.interpretation.interpretation)}</p>
							</div>

							{/* Meaning */}
							<div className="mt-4 text-start">
								<h4 className="text-clamp30 font-bold mb-2">카드 의미</h4>
								<p className="text-clamp25 font-normal">{cleanData(card.interpretation.meaning)}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default TarotResult;
