import api from '@/lib/api';
import { ApiTarotCardsResponse } from '@/types/tarotType';

export const tarotCardResult = async (
	selectedCards: {
		cardId: number;
		subTitle: string;
		isReversed: boolean;
	}[],
): Promise<ApiTarotCardsResponse> => {
	try {
		const { data } = await api.post('tarots/interpret-tarot', {
			cards: selectedCards,
		});

		return data;
	} catch (error) {
		throw error;
	}
};
