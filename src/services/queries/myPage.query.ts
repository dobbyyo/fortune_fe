import { useQuery } from '@tanstack/react-query';
import { ApiGetBookmarkResponse, GetNoticePayload } from '@/types/myPageType';
import { getBookmark, getNotice } from '../api/myPage.service';

export const useGetNotice = (payload: GetNoticePayload) => {
  return useQuery({
    queryKey: ['notice'],
    queryFn: async () => {
      const response = await getNotice(payload);
      return response.data;
    },
  });
};

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
