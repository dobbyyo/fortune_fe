import { SuccessResponse } from './apiType';

// 꿈 해몽 조회
export interface AiDreamPayload {
  title: string;
  description: string;
}

export interface AiDreamData {
  title: string;
  description: string;
  interpretation: string;
  bookmarked: boolean;
}

export interface AiDreamType {
  interpretation: AiDreamData;
}

export type ApiAiDreamResponse = SuccessResponse<AiDreamType>;

// 꿈 해몽 북마크
export interface AiDreamSavePayload {
  mainTitle: string;
  user_description: string;
  ai_interpretation: string;
}

export interface AiDreamSaveData {
  title: string;
  user_description: string;
  description: string;
  id: number;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
  user: {
    id: number;
  };
}

export interface AiDreamSaveType {
  savedDreamInterpretation: AiDreamSaveData;
}

export type ApiAiDreamSaveResponse = SuccessResponse<AiDreamSaveType>;

// 꿈 해몽 북마크 해제
export interface AiDreamSaveDeletePayload {
  id: number;
}

export type ApiAiDreamSaveDeleteResponse = SuccessResponse<null>;
