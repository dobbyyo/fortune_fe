import { useQuery } from '@tanstack/react-query';
import { todayFortune, todayFortuneExplain, todayZodiacFortuneExplain } from '../api/saju.service';

export const useTodayFortuneQuery = (userId: number | undefined, options = {}) => {
  return useQuery({
    queryKey: ['todayFortune', userId],
    queryFn: async () => {
      const response = await todayFortune(Number(userId));
      return response.data;
    },
    retry: 1,
    ...options,
  });
};

export const useTodayFortuneExplainQuery = (userId: number | undefined, options = {}) => {
  return useQuery({
    queryKey: ['todayFortuneExplain', userId],
    queryFn: async () => {
      const response = await todayFortuneExplain(Number(userId));
      return response.data;
    },
    retry: 1,
    ...options,
  });
};

export const useZodiacFortuneQuery = (userId: number | undefined, options = {}) => {
  return useQuery({
    queryKey: ['zodiacFortune', userId],
    queryFn: async () => {
      const response = await todayZodiacFortuneExplain(Number(userId));
      return response.data;
    },
    retry: 1,
    ...options,
  });
};
