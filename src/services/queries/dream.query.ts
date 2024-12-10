import { AiDreamSaveDeletePayload } from './../../types/dreamType';
import { aiDreamState, savedAiDreamState } from '@/stores/useDreamStore';
import { loadingState } from '@/stores/useLoadingStore';
import {
  AiDreamPayload,
  AiDreamSavePayload,
  ApiAiDreamResponse,
  ApiAiDreamSaveDeleteResponse,
  ApiAiDreamSaveResponse,
} from '@/types/dreamType';
import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { aiDream, aiDreamBookmark, aiDreamBookmarkDelete } from '../api/dream.service';
import { setLocalStorage } from '@/lib/localStorage';
import { useNavigate } from 'react-router-dom';

// AI 꿈해몽 조회
export const useAiDreamMutation = () => {
  const setLoading = useSetRecoilState(loadingState);
  const setDreamState = useSetRecoilState(aiDreamState);
  const navigate = useNavigate();

  return useMutation<ApiAiDreamResponse, Error, { payload: AiDreamPayload }>({
    mutationKey: ['aiDream'],
    mutationFn: async ({ payload }) => {
      setLoading(true);
      const response = await aiDream(payload);
      return response;
    },
    onSuccess: (response) => {
      const { interpretation } = response.data;

      setDreamState(interpretation);
      setLocalStorage('aiDream', interpretation);
      setLoading(false);
      navigate('/dream/result');
    },
    onSettled: () => {
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
  });
};

// AI 꿈해몽 북마크
export const useAiDreamBookmarkMutation = () => {
  const setLoading = useSetRecoilState(loadingState);
  const setSavedDreamState = useSetRecoilState(savedAiDreamState);

  return useMutation<ApiAiDreamSaveResponse, Error, { payload: AiDreamSavePayload }>({
    mutationKey: ['aiDreamBookmark'],
    mutationFn: async ({ payload }) => {
      setLoading(true);
      const response = await aiDreamBookmark(payload);
      return response;
    },
    onSuccess: (response) => {
      const { savedDreamInterpretation } = response.data;

      // Recoil 상태 업데이트
      setSavedDreamState(savedDreamInterpretation);

      // 로컬스토리지 업데이트
      localStorage.setItem('savedDream', JSON.stringify(savedDreamInterpretation));

      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
  });
};

// AI 꿈해몽 북마크 해제
export const useAiDreamBookmarkDeleteMutation = () => {
  const setLoading = useSetRecoilState(loadingState);
  const setSavedDreamState = useSetRecoilState(savedAiDreamState);

  return useMutation<ApiAiDreamSaveDeleteResponse, Error, { payload: AiDreamSaveDeletePayload }>({
    mutationKey: ['aiDreamBookmarkDelete'],
    mutationFn: async ({ payload }) => {
      setLoading(true);
      const response = await aiDreamBookmarkDelete(payload);
      return response;
    },
    onSuccess: () => {
      // Recoil 상태 업데이트
      setSavedDreamState(null);

      // 로컬스토리지 초기화
      localStorage.removeItem('savedDream');

      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
  });
};
