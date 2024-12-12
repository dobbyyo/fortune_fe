import api from '@/lib/api';
import {
  ApiGetBookmarkResponse,
  ApiGetNoticeResponse,
  GetDetailDreamBookmarkPayload,
  GetDetailDreamBookmarkResponse,
  GetDetailFortuneBookmarkResponse,
  GetDetailNamingBookmarkPayload,
  GetDetailNamingBookmarkResponse,
  GetDetailTarotBookmarkPayload,
  GetDetailTarotBookmarkResponse,
  GetDetailTFortuneBookmarkPayload,
  GetNoticePayload,
} from '@/types/myPageType';

// 공지 가져오기
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

// 북마크 가져오기
export const getBookmark = async (userId: number): Promise<ApiGetBookmarkResponse> => {
  try {
    const { data } = await api.get<ApiGetBookmarkResponse>(`/users/myBookmarks/${userId}`);

    return data;
  } catch (error) {
    throw error;
  }
};

// 타로카드 북마크 상세가져오기
export const getDetailTarotBookmark = async (
  payload: GetDetailTarotBookmarkPayload,
): Promise<GetDetailTarotBookmarkResponse> => {
  try {
    const { data } = await api.get(`/users/myBookmarks/tarotCardDetails`, {
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

// 운세 북마크 상세가져오기
export const getDetailTFortuneBookmark = async (
  payload: GetDetailTFortuneBookmarkPayload,
): Promise<GetDetailFortuneBookmarkResponse> => {
  try {
    const { data } = await api.get(`/users/myBookmarks/fortuneDetails`, {
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

// 꿈해몽 북마크 상세가져오기
export const getDetailDreamBookmark = async (
  payload: GetDetailDreamBookmarkPayload,
): Promise<GetDetailDreamBookmarkResponse> => {
  try {
    const { data } = await api.get(`/users/myBookmarks/dreamDetails/${payload.userId}`);

    return data;
  } catch (error) {
    throw error;
  }
};

// 작명 북마크 상세가져오기
export const getDetailNamingBookmark = async (
  payload: GetDetailNamingBookmarkPayload,
): Promise<GetDetailNamingBookmarkResponse> => {
  try {
    const { data } = await api.get(`/users/myBookmarks/namingDetails/${payload.userId}`);

    return data;
  } catch (error) {
    throw error;
  }
};
