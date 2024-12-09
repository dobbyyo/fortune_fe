import api from '@/lib/api';
import { ApiAiNamingResponse, NamingPayload } from '@/types/namingType';

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
