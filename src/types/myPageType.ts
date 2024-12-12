import { SuccessResponse } from './apiType';

// 공지
export interface GetNoticePayload {
  start_date: string;
  end_date: string;
  page: number;
  limit: number;
}

export interface GetNoticeData {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  title: string;
  content: string;
}

export interface GetNoticeType {
  information: GetNoticeData[];
}

export type ApiGetNoticeResponse = SuccessResponse<GetNoticeType>;

// 운세 전체 가져오기
export interface GetSavedTarotData {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface getSavedFortuneData {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  title: string;
  user_id: number;
  todays_fortune_id: number;
  zodiac_fortune_id: number;
  star_sign_fortune_id: number;
  saved_at: string;
}

export interface myBookMarksData {
  savedTarot: GetSavedTarotData[];
  savedFortune: getSavedFortuneData[];
  hasSavedNaming: boolean;
  hasSavedDream: boolean;
}

export interface GetBookmarkType {
  myBookmarks: myBookMarksData;
}

export type ApiGetBookmarkResponse = SuccessResponse<GetBookmarkType>;
