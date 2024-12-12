import { useMutation, useQuery } from '@tanstack/react-query';
import {
  todayConstellationFortune,
  todayFortune,
  todayFortuneDelete,
  todayFortuneExplain,
  todayFortuneSave,
  todayZodiacFortuneExplain,
} from '../api/saju.service';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/stores/useLoadingStore';
import { todayFortuneSavePayloadType } from '@/types/fortuneType';
import { setLocalStorage } from '@/lib/localStorage';
import { isTodayFortuneSavedState } from '@/stores/useSajuStore';
import { errorState } from '@/stores/useErrorStore';

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

export const useConstellationFortuneQuery = (userId: number | undefined, options = {}) => {
  return useQuery({
    queryKey: ['constellationFortune', userId],
    queryFn: async () => {
      const response = await todayConstellationFortune(Number(userId));
      return response.data;
    },
    retry: 1,
    ...options,
  });
};

// 오늘의 운세 저장
export const useTodayFortuneSaveMutation = () => {
  const setLoading = useSetRecoilState(loadingState);
  const setTodayFortuneSaved = useSetRecoilState(isTodayFortuneSavedState);
  const setError = useSetRecoilState(errorState);

  return useMutation<any, Error, { payload: todayFortuneSavePayloadType }>({
    mutationKey: ['todayFortuneSave'],
    mutationFn: async ({ payload }: { payload: todayFortuneSavePayloadType }) => {
      setLoading(true);
      const response = await todayFortuneSave(payload);

      return response;
    },
    onSuccess: async (response) => {
      const { savedSandbar } = response.data;
      setTodayFortuneSaved(true);
      setLocalStorage('todayFortuneBookmark', { isBookmark: true, id: savedSandbar.id });
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
      setError(true);
    },
  });
};

// 오늘의 운세 삭제
export const useTodayFortuneDeleteMutation = () => {
  const setLoading = useSetRecoilState(loadingState);
  const setTodayFortuneSaved = useSetRecoilState(isTodayFortuneSavedState);
  const setError = useSetRecoilState(errorState);

  return useMutation<any, Error, { payload: { sandbarId: number; userId: number } }>({
    mutationKey: ['todayFortuneDelete'],
    mutationFn: async ({ payload }: { payload: { sandbarId: number; userId: number } }) => {
      setLoading(true);
      const response = await todayFortuneDelete(payload);

      return response;
    },
    onSuccess: async () => {
      setTodayFortuneSaved(false);
      setLocalStorage('todayFortuneBookmark', null);
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
      setError(true);
    },
  });
};
