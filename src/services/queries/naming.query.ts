import {
  AiNamingSaveData,
  AiNamingSaveDeletePayload,
  AiNamingSavePayload,
  ApiAiNamingResponse,
  ApiAiNamingSaveDeleteResponse,
  ApiAiNamingSaveResponse,
  NamingPayload,
} from '@/types/namingType';
import { useMutation } from '@tanstack/react-query';
import { aiNaming, aiNamingBookmark, aiNamingBookmarkDelete } from '../api/naming.service';
import { loadingState } from '@/stores/useLoadingStore';
import { useSetRecoilState } from 'recoil';
import { aiNamingState, savedAiNamingState } from '@/stores/useNamingStore';
import { setLocalStorage } from '@/lib/localStorage';
import { useNavigate } from 'react-router-dom';
import { errorState } from '@/stores/useErrorStore';

// AI 작명 조회
export const useAiNamingMutation = () => {
  const setLoading = useSetRecoilState(loadingState);
  const setAiNamingState = useSetRecoilState(aiNamingState);
  const navigate = useNavigate();
  const setError = useSetRecoilState(errorState);

  return useMutation<ApiAiNamingResponse, Error, { payload: NamingPayload }>({
    mutationKey: ['aiNaming'],
    mutationFn: async ({ payload }) => {
      setLoading(true);
      const response = await aiNaming(payload);
      return response;
    },
    onSuccess: (response) => {
      const { naming } = response.data;

      setAiNamingState({ naming });
      setLocalStorage('aiNaming', naming);
      setLoading(false);
      navigate('/naming/result');
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

// AI 작명 북마크
export const useAiNamingBookmarkMutation = () => {
  const setLoading = useSetRecoilState(loadingState);
  const setSavedAiNamingState = useSetRecoilState(savedAiNamingState);
  const setAiNamingState = useSetRecoilState(aiNamingState);
  const setError = useSetRecoilState(errorState);

  return useMutation<ApiAiNamingSaveResponse, Error, { payload: AiNamingSavePayload }>({
    mutationKey: ['aiNamingBookmark'],
    mutationFn: async ({ payload }) => {
      setLoading(true);
      const response = await aiNamingBookmark(payload);
      return response;
    },
    onSuccess: (response) => {
      const { savedNamings } = response.data;
      setLoading(false);

      // 로컬스토리지 업데이트
      const savedNamingsJson: AiNamingSaveData[] = JSON.parse(localStorage.getItem('savedNamings') || '[]');
      const updatedNamings = [...savedNamingsJson, ...savedNamings];
      localStorage.setItem('savedNamings', JSON.stringify(updatedNamings));

      // Recoil 상태 업데이트
      setSavedAiNamingState(updatedNamings);

      setAiNamingState((prevState) =>
        prevState
          ? {
              ...prevState,
              naming: prevState.naming.map((naming) => ({
                ...naming,
                bookmarked: savedNamings.some((saved) => saved.name === naming.name),
              })),
            }
          : prevState,
      );
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

export const useAiNamingUnBookmarkMutation = () => {
  const setLoading = useSetRecoilState(loadingState);
  const setAiNamingState = useSetRecoilState(aiNamingState);
  const setSavedAiNamingState = useSetRecoilState(savedAiNamingState);
  const setError = useSetRecoilState(errorState);

  return useMutation<ApiAiNamingSaveDeleteResponse, Error, { payload: AiNamingSaveDeletePayload }>({
    mutationKey: ['aiNamingUnBookmark'],
    mutationFn: async ({ payload }) => {
      setLoading(true);
      const response = await aiNamingBookmarkDelete(payload);
      return response;
    },
    onSuccess: (_, { payload }) => {
      // 로컬스토리지에서 데이터 제거
      const savedNamingsJson: AiNamingSaveData[] = JSON.parse(localStorage.getItem('savedNamings') || '[]');
      const updatedNamings = savedNamingsJson.filter((saved) => saved.naming.id !== payload.id);
      localStorage.setItem('savedNamings', JSON.stringify(updatedNamings));

      // Recoil 상태 업데이트
      setSavedAiNamingState(updatedNamings);

      setAiNamingState((prevState) =>
        prevState
          ? {
              ...prevState,
              naming: prevState.naming.map((naming) => ({
                ...naming,
                bookmarked: !updatedNamings.some((saved) => saved.name === naming.name),
              })),
            }
          : prevState,
      );
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
