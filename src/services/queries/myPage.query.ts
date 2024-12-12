import { useQuery } from '@tanstack/react-query';
import {
  ApiGetBookmarkResponse,
  GetDetailDreamBookmarkPayload,
  GetDetailNamingBookmarkPayload,
  GetDetailTarotBookmarkPayload,
  GetDetailTFortuneBookmarkPayload,
  GetNoticePayload,
} from '@/types/myPageType';
import {
  getBookmark,
  getDetailDreamBookmark,
  getDetailNamingBookmark,
  getDetailTarotBookmark,
  getDetailTFortuneBookmark,
  getNotice,
} from '../api/myPage.service';

// 공지 가져오기
export const useGetNotice = (payload: GetNoticePayload) => {
  return useQuery({
    queryKey: ['notice'],
    queryFn: async () => {
      const response = await getNotice(payload);
      return response.data;
    },
  });
};

// 북마크 가져오기
export const useGetBookmarkQuery = (userId: number, options = {}) => {
  return useQuery({
    queryKey: ['bookmark'],
    queryFn: async () => {
      const response = await getBookmark(userId);
      return response.data.myBookmarks;
    },
    retry: 1,
    ...options,
  });
};

// 타로카드 북마크 상세가져오기
export const useGetDetailTarotBookmark = (payload: GetDetailTarotBookmarkPayload, options = {}) => {
  return useQuery({
    queryKey: ['tarotCardDetails', payload.tarotCardId],
    queryFn: async () => {
      const response = await getDetailTarotBookmark(payload);
      return response.data;
    },

    ...options,
  });
};

// 운세 북마크 상세가져오기
export const useGetDetailFortuneBookmark = (payload: GetDetailTFortuneBookmarkPayload, options = {}) => {
  return useQuery({
    queryKey: ['fortuneDetails', payload.fortuneId, payload.zodiacId, payload.startId],
    queryFn: async () => {
      const response = await getDetailTFortuneBookmark(payload);
      return response.data;
    },

    ...options,
  });
};

// 꿈해몽 북마크 상세가져오기
export const useGetDetailDreamBookmark = (payload: GetDetailDreamBookmarkPayload, options = {}) => {
  return useQuery({
    queryKey: ['dreamDetails', payload.userId],
    queryFn: async () => {
      const response = await getDetailDreamBookmark(payload);
      return response.data;
    },

    ...options,
  });
};

// 작명 북마크 상세가져오기
export const useGetDetailNamingBookmark = (payload: GetDetailNamingBookmarkPayload, options = {}) => {
  return useQuery({
    queryKey: ['namingDetails', payload.userId],
    queryFn: async () => {
      const response = await getDetailNamingBookmark(payload);
      return response.data;
    },

    ...options,
  });
};
