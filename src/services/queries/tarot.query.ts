import {
  ApiTarotCardInterpretationBookmarkedResponse,
  ApiTarotCardSharedResponse,
  ApiTarotCardsResponse,
  TarotBookmarkDeletePayloadType,
  TarotBookmarkPayload,
  TarotSharePayload,
} from '@/types/tarotType';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getTarotCardShare,
  tarotCardResult,
  tarotCardResultBookmark,
  tarotCardResultBookmarkDelete,
  tarotCardShare,
} from '../api/tarot.service';
import { useNavigate } from 'react-router-dom';
import { TarotBookmarkState, tarotCardsState, tarotSharedState } from '@/stores/useTarotCardStore';
import { useSetRecoilState } from 'recoil';
import { setLocalStorage } from '@/lib/localStorage';
import { loadingState } from '@/stores/useLoadingStore';
import { SuccessResponse } from '@/types/apiType';
import { errorState } from '@/stores/useErrorStore';
import { config } from '@/config/config';

export const useTarotCardInterpretationMutation = () => {
  const navigate = useNavigate();
  const setTarotCards = useSetRecoilState(tarotCardsState);
  const setLoading = useSetRecoilState(loadingState);
  const setError = useSetRecoilState(errorState);

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
    onError: () => {
      setLoading(false); // 에러 시에도 로딩 상태 종료
      setError(true); // 에러 상태 변경
    },
  });
};

export const useTarotCardBookmarkMutation = () => {
  const setLoading = useSetRecoilState(loadingState);
  const setTarotBookmark = useSetRecoilState(TarotBookmarkState);
  const setError = useSetRecoilState(errorState);

  return useMutation<
    ApiTarotCardInterpretationBookmarkedResponse,
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
    onError: () => {
      setLoading(false);
      setError(true);
    },
  });
};

export const useTarotCardBookmarkDeleteMutation = () => {
  const setLoading = useSetRecoilState(loadingState);
  const setTarotBookmark = useSetRecoilState(TarotBookmarkState);
  const setError = useSetRecoilState(errorState);

  return useMutation<
    SuccessResponse<null>,
    Error,
    {
      payload: TarotBookmarkDeletePayloadType;
    }
  >({
    mutationKey: ['tarotCardBookmarkDelete'],
    mutationFn: async ({ payload }: { payload: TarotBookmarkDeletePayloadType }) => {
      setLoading(true);
      const response = await tarotCardResultBookmarkDelete(payload);

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
    onError: () => {
      setLoading(false);
      setError(true);
    },
  });
};

export const useTarotCardShareMutation = () => {
  const setLoading = useSetRecoilState(loadingState);
  const setError = useSetRecoilState(errorState);
  const setShared = useSetRecoilState(tarotSharedState);

  return useMutation<
    ApiTarotCardSharedResponse,
    Error,
    {
      payload: TarotSharePayload;
    }
  >({
    mutationKey: ['tarotCardShare'],
    mutationFn: async ({ payload }: { payload: TarotSharePayload }) => {
      setLoading(true);
      const response = await tarotCardShare(payload);

      return response;
    },
    onSuccess: async (response) => {
      const { currentUrl } = config;

      const { shareCards } = response.data;
      const newShareId = shareCards.id;

      setShared(newShareId);

      const shareUrl = `${currentUrl}/tarot/result/share/${newShareId}`;

      // Web Share API 호출
      try {
        if (navigator.share) {
          await navigator.share({
            title: '오늘의 타로 결과',
            text: '타로 결과를 확인해보세요!',
            url: shareUrl,
          });
          console.log('공유 성공');
        } else {
          alert('이 브라우저는 공유 기능을 지원하지 않습니다.');
        }
      } catch (error) {
        console.error('공유 실패 또는 취소:', error);
      }

      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
    onError: (error) => {
      console.error('공유 링크 생성 실패:', error);
      alert('공유 링크 생성에 실패했습니다.');
      setLoading(false);
      setError(true);
    },
  });
};

export const useGetTarotCardShareQuery = (id: number, options = {}) => {
  return useQuery({
    queryKey: ['tarotCardShare', id],
    queryFn: async () => {
      const response = await getTarotCardShare(id);
      return response.data;
    },
    ...options,
  });
};
