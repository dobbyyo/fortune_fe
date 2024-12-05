import { ApiTarotCardsResponse, TarotBookmarkPayload } from '@/types/tarotType';
import { useMutation } from '@tanstack/react-query';
import { tarotCardResult, tarotCardResultBookmark, tarotCardResultBookmarkDelete } from '../api/tarot.service';
import { useNavigate } from 'react-router-dom';
import { TarotBookmarkState, tarotCardsState } from '@/stores/useTarotCardStore';
import { useSetRecoilState } from 'recoil';
import { setLocalStorage } from '@/lib/localStorage';
import { loadingState } from '@/stores/useLoadingStore';

export const useTarotCardInterpretationMutation = () => {
  const navigate = useNavigate();
  const setTarotCards = useSetRecoilState(tarotCardsState);
  const setLoading = useSetRecoilState(loadingState);

  return useMutation<ApiTarotCardsResponse, Error, { cardId: number; subTitle: string; isReversed: boolean }[]>({
    mutationKey: ['tarotCardInterpretation'],
    mutationFn: async (selectedCards) => {
      setLoading(true);
      const response = await tarotCardResult(selectedCards);

      return response;
    },
    onSuccess: async (response) => {
      // tarotCards를 response에서 가져옴
      const { tarotCards } = response.data;

      setTarotCards(tarotCards);
      setLocalStorage('tarotCards', tarotCards);
      navigate('/tarot/card');
    },
    onSettled: () => {
      setLoading(false); // 로딩 상태 종료
    },
    onError: (error) => {
      console.error('Error:', error);
      setLoading(false); // 에러 시에도 로딩 상태 종료
    },
  });
};

export const useTarotCardBookmarkMutation = () => {
  const setLoading = useSetRecoilState(loadingState);
  const setTarotBookmark = useSetRecoilState(TarotBookmarkState);
  return useMutation<
    any,
    Error,
    {
      payload: TarotBookmarkPayload;
    }
  >({
    mutationKey: ['tarotCardBookmark'],
    mutationFn: async ({ payload }: { payload: TarotBookmarkPayload }) => {
      setLoading(true);
      const response = await tarotCardResultBookmark(payload);

      return response;
    },
    onSuccess: async (response) => {
      const { savedCards } = response.data;
      setLoading(false);
      setTarotBookmark(true);
      setLocalStorage('tarotBookmark', { isBookmark: true, id: savedCards.id });
    },
    onSettled: () => {
      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
      console.error('Error:', error);
    },
  });
};

export const useTarotCardBookmarkDeleteMutation = () => {
  const setLoading = useSetRecoilState(loadingState);
  const setTarotBookmark = useSetRecoilState(TarotBookmarkState);
  return useMutation<any, Error, number>({
    mutationKey: ['tarotCardBookmarkDelete'],
    mutationFn: async (savedCardId: number) => {
      setLoading(true);
      const response = await tarotCardResultBookmarkDelete(savedCardId);

      return response;
    },
    onSuccess: async () => {
      setLoading(false);
      setTarotBookmark(false);
      setLocalStorage('tarotBookmark', null);
    },
    onSettled: () => {
      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
      console.error('Error:', error);
    },
  });
};
