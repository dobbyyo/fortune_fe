import { SuccessResponse } from '@/types/apiType';

// 타로카드 해석
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

// 타로카드 결과 저장
export interface TarotBookmarkPayload {
  mainTitle: string;
  cards: {
    cardId: number;
    subTitle: string;
    isReversed: boolean;
    cardInterpretation: string;
  }[];
}

export interface TarotCardInterpretationBookmarked {
  created_at: string;
  deleted_at: string;
  id: number;
  title: string;
  upadted_at: string;
}

export interface TarotCardsBookmarkResponse {
  saveCards: TarotCardInterpretationBookmarked[];
}

export type ApiTarotCardInterpretationBookmarkedResponse = SuccessResponse<TarotCardsBookmarkResponse>;
