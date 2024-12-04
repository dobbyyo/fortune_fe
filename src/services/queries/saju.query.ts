import { useQuery } from '@tanstack/react-query';
import { todayFortune } from '../api/saju.service';

export const useTodayFortuneQuery = (userId: number | undefined, options = {}) => {
  return useQuery({
    queryKey: ['todayFortune', userId],
    queryFn: async () => {
      if (userId === undefined) throw new Error('User ID is undefined');

      const response = await todayFortune(Number(userId));
      return response.data;
    },
    retry: 1,
    ...options,
  });
};
