import api from '@/lib/api';
import { SuccessResponse } from '@/types/apiType';
import {
  ApiTarotCardInterpretationBookmarkedResponse,
  ApiTarotCardsResponse,
  TarotBookmarkPayload,
} from '@/types/tarotType';

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

export const tarotCardResultBookmark = async (
  payload: TarotBookmarkPayload,
): Promise<ApiTarotCardInterpretationBookmarkedResponse> => {
  try {
    const { data } = await api.post('tarots/save', payload);

    return data;
  } catch (error) {
    throw error;
  }
};

export const tarotCardResultBookmarkDelete = async (savedCardId: number): Promise<SuccessResponse<null>> => {
  try {
    const { data } = await api.delete(`tarots/cancle/${savedCardId}`);

    return data;
  } catch (error) {
    throw error;
  }
};
