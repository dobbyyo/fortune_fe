import api from '@/lib/api';
import {
  AiNamingSaveDeletePayload,
  AiNamingSavePayload,
  ApiAiNamingResponse,
  ApiAiNamingSaveDeleteResponse,
  ApiAiNamingSaveResponse,
  NamingPayload,
} from '@/types/namingType';

// AI 작명 조회
export const aiNaming = async (payload: NamingPayload): Promise<ApiAiNamingResponse> => {
  try {
    const { data } = await api.post<ApiAiNamingResponse>('/namings/draw', {
      ...payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

// AI 작명 북마크
export const aiNamingBookmark = async (payload: AiNamingSavePayload): Promise<ApiAiNamingSaveResponse> => {
  try {
    const { data } = await api.post<ApiAiNamingSaveResponse>('/namings/save', {
      ...payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

// AI 작명 북마크해제
export const aiNamingBookmarkDelete = async (
  payload: AiNamingSaveDeletePayload,
): Promise<ApiAiNamingSaveDeleteResponse> => {
  try {
    const { data } = await api.delete<ApiAiNamingSaveDeleteResponse>(`/namings/cancel/${payload.id}`);

    return data;
  } catch (error) {
    throw error;
  }
};
