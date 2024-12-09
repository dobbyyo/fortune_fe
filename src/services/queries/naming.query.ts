import { ApiAiNamingResponse, NamingPayload } from '@/types/namingType';
import { useMutation } from '@tanstack/react-query';
import { aiNaming } from '../api/naming.service';
import { loadingState } from '@/stores/useLoadingStore';
import { useSetRecoilState } from 'recoil';
import { aiNamingState } from '@/stores/useNamingStore';
import { setLocalStorage } from '@/lib/localStorage';
import { useNavigate } from 'react-router-dom';

// AI 작명 조회
export const useAiNamingMutation = () => {
  const setLoading = useSetRecoilState(loadingState);
  const setAiNamingState = useSetRecoilState(aiNamingState);
  const navigate = useNavigate();

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
    },
  });
};
