import { SuccessResponse } from '@/types/apiType';

export interface TarotCard {
	id: number;
	name: string;
	type: string;
	card_num: number;
	suit: string;
	image_url: string;
	subTitle: string;
	isReversed: boolean;
	interpretation: TarotCardInterpretation;
}

interface TarotCardInterpretation {
	name: string;
	meaning: string;
	subTitle: string;
	interpretation: string;
}

export interface TarotCardsResponse {
	tarotCards: TarotCard[];
}

export type ApiTarotCardsResponse = SuccessResponse<TarotCardsResponse>;
