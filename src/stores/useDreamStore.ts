import { AiDreamData, AiDreamSaveData } from '@/types/dreamType';
import { atom } from 'recoil';

export const aiDreamMainTitleTab = atom<string>({
  key: 'dreamMainTitleTab',
  default: '사람/행동',
});

// AI 꿈해몽 조회 관리
export const aiDreamState = atom<AiDreamData | null>({
  key: 'dreamState',
  default: null,
});

// 북마크 및 저장된 데이터 관리
export const savedAiDreamState = atom<AiDreamSaveData | null>({
  key: 'savedDreamState',
  default: null,
});
