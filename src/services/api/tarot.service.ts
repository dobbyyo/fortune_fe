import api from '@/lib/api';
import { SuccessResponse } from '@/types/apiType';
import {
  ApiGetTarotCardSharedResponse,
  ApiTarotCardInterpretationBookmarkedResponse,
  ApiTarotCardSharedResponse,
  ApiTarotCardsResponse,
  TarotBookmarkDeletePayloadType,
  TarotBookmarkPayload,
  TarotSharePayload,
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

export const tarotCardResultBookmarkDelete = async (
  payload: TarotBookmarkDeletePayloadType,
): Promise<SuccessResponse<null>> => {
  try {
    const { data } = await api.delete(`tarots/cancel`, {
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const tarotCardShare = async (payload: TarotSharePayload): Promise<ApiTarotCardSharedResponse> => {
  try {
    const { data } = await api.post('tarots/share', payload);

    return data;
  } catch (error) {
    throw error;
  }
};

export const getTarotCardShare = async (id: number): Promise<ApiGetTarotCardSharedResponse> => {
  try {
    const { data } = await api.get(`tarots/share/${id}`);

    return data;
  } catch (error) {
    throw error;
  }
};
