import {
  ConstellationFortuneType,
  TodayFortuneExplanationType,
  TodayFortuneType,
  TodayZodiacFortuneExplanationType,
} from '@/types/fortuneType';
import { atom } from 'recoil';

// 오늘의 운세 조회
export const todayFortuneState = atom<TodayFortuneType | null>({
  key: 'todayFortuneState',
  default: null,
});

// 오늘의 운세 해석
export const explainFortuneState = atom<TodayFortuneExplanationType | null>({
  key: 'explainFortuneState',
  default: null,
});

// 띠 운세 조회
export const fortuneZodiacState = atom<TodayZodiacFortuneExplanationType | null>({
  key: 'fortuneZodiacState',
  default: null,
});

// 별자리 운세 조회
export const fortuneConstellationState = atom<ConstellationFortuneType | null>({
  key: 'fortuneConstellationState',
  default: null,
});

// 오늘의 운세 저장 여부
export const isTodayFortuneSavedState = atom<boolean>({
  key: 'isTodayFortuneSavedState',
  default: false,
});
