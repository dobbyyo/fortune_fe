import { ApiTarotCardsResponse } from '@/types/tarotType';
import { useMutation } from '@tanstack/react-query';
import { tarotCardResult } from '../api/tarot.service';
import { useNavigate } from 'react-router-dom';
import { tarotCardsState } from '@/stores/useTarotCardStore';
import { useSetRecoilState } from 'recoil';
import { setLocalStorage } from '@/lib/localStorage';

export const useTarotCardInterpretationMutation = () => {
	const navigate = useNavigate();
	const setTarotCards = useSetRecoilState(tarotCardsState);

	return useMutation<ApiTarotCardsResponse, Error, { cardId: number; subTitle: string; isReversed: boolean }[]>({
		mutationKey: ['tarotCardInterpretation'],
		mutationFn: async (selectedCards) => {
			const response = await tarotCardResult(selectedCards);

			return response;
		},
		onSuccess: async (response) => {
			// tarotCards를 response에서 가져옴
			const { tarotCards } = response.data;

			setTarotCards(tarotCards);
			setLocalStorage('tarotCards', tarotCards);
			navigate('/tarot/card');
		},
	});
};
