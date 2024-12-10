import { AiNamingSaveData, AiNamingType } from '@/types/namingType';
import { atom } from 'recoil';

// 탭 관리 리코일
export const namingMainTitleTab = atom<string>({
  key: 'mainTitleTab',
  default: '사람',
});

// AI 작명 조회 관리 리코일
export const aiNamingState = atom<AiNamingType | null>({
  key: 'aiNamingState',
  default: null,
});

// 북마크 및 저장된 데이터 관리 리코일
export const savedAiNamingState = atom<AiNamingSaveData[]>({
  key: 'savedAiNamingState',
  default: [],
});
