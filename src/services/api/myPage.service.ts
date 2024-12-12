import api from '@/lib/api';
import { ApiGetBookmarkResponse, ApiGetNoticeResponse, GetNoticePayload } from '@/types/myPageType';

export const getNotice = async (payload: GetNoticePayload): Promise<ApiGetNoticeResponse> => {
  try {
    const { data } = await api.get<ApiGetNoticeResponse>('/information/getInformation', {
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const getBookmark = async (userId: number): Promise<ApiGetBookmarkResponse> => {
  try {
    const { data } = await api.get<ApiGetBookmarkResponse>(`/users/myBookmarks/${userId}`);

    return data;
  } catch (error) {
    throw error;
  }
};
