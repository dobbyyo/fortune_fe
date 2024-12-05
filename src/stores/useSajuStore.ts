import { TodayFortuneType } from '@/types/fortuneType';
import { atom } from 'recoil';

export const todayFortuneState = atom<TodayFortuneType | null>({
  key: 'todayFortuneState',
  default: null,
});
