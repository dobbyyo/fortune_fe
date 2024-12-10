import { SuccessResponse } from './apiType';

// AI 작명 조회
export interface NamingPayload {
  mainTitle: string;
  content: string;
}

export interface NamingData {
  name: string;
  hanja: string | null;
  description: string;
  bookmarked: boolean; // 북마크 여부 추가
}

export interface AiNamingType {
  naming: NamingData[];
}

export type ApiAiNamingResponse = SuccessResponse<AiNamingType>;

// 작명 저장
export interface AiNamingSavePayload {
  mainTitle: string;
  namings: {
    name: string;
    description: string;
  }[];
}

export interface AiNamingSaveData {
  name: string;
  description: string;
  naming: {
    id: number;
    mainTitle: string;
    date: string;
  };
  user: {
    id: number;
  };
  id: number;
}

export interface AiNamingSaveType {
  savedNamings: AiNamingSaveData[];
}

export type ApiAiNamingSaveResponse = SuccessResponse<AiNamingSaveType>;

// 작명 북마크 해제
export interface AiNamingSaveDeletePayload {
  id: number;
}

export type ApiAiNamingSaveDeleteResponse = SuccessResponse<null>;
