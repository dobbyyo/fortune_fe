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

// 타로카드 북마크 상세가져오기
export interface GetDetailTarotBookmarkPayload {
  userId: number;
  tarotCardId: number;
}

export interface SavedTarotCardData {
  id: number;
  subTitle: string;
  userId: number;
  cardId: number;
  isUpright: boolean;
  cardInterpretation: string;
  imgUrl: string;
  cardName: string;
}

export interface GetDetailTarotBookmarkType {
  savedTarotCardsResults: SavedTarotCardData[];
}

export type GetDetailTarotBookmarkResponse = SuccessResponse<GetDetailTarotBookmarkType>;

// 타로카드 운세 상세가져오기
export interface GetDetailTFortuneBookmarkPayload {
  userId: number;
  fortuneId: number;
  zodiacId: number;
  startId: number;
}

export interface SavedTFortuneData {
  id: number;
  total_fortune_title: string;
  total_fortune_description: string;
  wealth_fortune_title: string;
  wealth_fortune_description: string;
  love_fortune_title: string;
  love_fortune_description: string;
  business_fortune_title: string;
  business_fortune_description: string;
  health_fortune_title: string;
  health_fortune_description: string;
  study_fortune_title: string;
  study_fortune_description: string;
  lucky_items_title: string;
  lucky_item_1: string;
  lucky_item_2: string;
  lucky_outfit_title: string;
  lucky_outfit_description: string;
}

export interface SavedZodiacData {
  id: number;
  zodiac_title: string;
  zodiac_main_description: string;
  zodiac_sub_description: string;
  year_of_birth: string;
  image_url: string;
}

export interface SavedStarData {
  id: number;
  star_sign: string;
  star_main_description: string;
  star_sub_description: string;
  year: string;
  start_date: string;
  end_date: string;
  image_url: string;
}

export interface GetDetailFortuneBookmarkData {
  savedFortuneCards: SavedTFortuneData;
  savedZodiacs: SavedZodiacData;
  savedStars: SavedStarData;
}

export interface GetDetailFortuneBookmarkType {
  savedFortune: GetDetailFortuneBookmarkData;
}

export type GetDetailFortuneBookmarkResponse = SuccessResponse<GetDetailFortuneBookmarkType>;
