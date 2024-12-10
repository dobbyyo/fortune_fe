import api from '@/lib/api';
import {
  AiDreamPayload,
  AiDreamSaveDeletePayload,
  AiDreamSavePayload,
  ApiAiDreamResponse,
  ApiAiDreamSaveDeleteResponse,
  ApiAiDreamSaveResponse,
} from '@/types/dreamType';

//  AI 해몽 조회
export const aiDream = async (payload: AiDreamPayload): Promise<ApiAiDreamResponse> => {
  try {
    const { data } = await api.post<ApiAiDreamResponse>('/dreams/interpret', {
      ...payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

// AI 해몽 북마크
export const aiDreamBookmark = async (payload: AiDreamSavePayload): Promise<ApiAiDreamSaveResponse> => {
  try {
    const { data } = await api.post<ApiAiDreamSaveResponse>('/dreams/save', {
      ...payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

// AI 해몽 북마크해제
export const aiDreamBookmarkDelete = async (
  payload: AiDreamSaveDeletePayload,
): Promise<ApiAiDreamSaveDeleteResponse> => {
  try {
    const { data } = await api.delete<ApiAiDreamSaveDeleteResponse>(`/dreams/cancel/${payload.id}`);

    return data;
  } catch (error) {
    throw error;
  }
};
