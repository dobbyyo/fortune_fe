import { AiNamingType } from '@/types/namingType';
import { atom } from 'recoil';

export const aiNamingState = atom<AiNamingType | null>({
  key: 'aiNamingState',
  default: null,
});
