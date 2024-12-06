import { SuccessResponse } from '@/types/apiType';

// 오늘의 운세 조회
export interface BaseElements {
  year: string;
  month: string;
  day: string;
  hour: string;
}

export interface HeavenlyEarthlyData {
  year: string;
  month: string;
  day: string;
  hour: string;
  elements: {
    img: BaseElements;
    baseElements: BaseElements;
  };
}
export interface FortunesData {
  heavenly: HeavenlyEarthlyData;
  earthly: HeavenlyEarthlyData;
  heavenlyStemTenGod: BaseElements;
  earthlyBranchTenGod: BaseElements;
  tenStemTwelveStates: BaseElements;
  twelveGod: BaseElements;
}

export interface TodayFortuneType {
  fortunesData: FortunesData;
}

export type ApiTodayFortuneResponse = SuccessResponse<TodayFortuneType>;

// 오늘의 운세 해석

interface TodayFortuneExplanationData {
  generalFortune: string;
  wealthFortune: string;
  loveFortune: string;
  careerFortune: string;
  healthFortune: string;
  studyFortune: string;
  luckyElements: string[];
  luckyOutfit: string;
}

export interface TodayFortuneExplanationType {
  explanationData: TodayFortuneExplanationData;
}

export type ApiTodayFortuneExplanationResponse = SuccessResponse<TodayFortuneExplanationType>;

// 띠 운세 조회
export interface ZodiacFortuneData {
  id: number;
  name: string;
  info: string;
  start_year: number;
  cycle: number;
  rest: number;
  image_url: string;
  zodiacGeneral: string;
  zodiacToday: string;
  yearlyFortunes: {
    [key: string]: string;
  };
}

export interface TodayZodiacFortuneExplanationType {
  zodiacFortune: ZodiacFortuneData;
}

export type ApiTodayZodiacFortuneExplanationResponse = SuccessResponse<TodayZodiacFortuneExplanationType>;

// 별자리 운세

export interface ConstellationData {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  image_url: string;
  constellationGeneral: string;
  constellationToday: string;
}

export interface ConstellationFortuneType {
  constellation: ConstellationData;
}

export type ApiConstellationFortuneResponse = SuccessResponse<ConstellationFortuneType>;

// 오늘의 운세 저장

export interface todayFortuneSavePayloadType {
  userId: number;
  title: string;
  todaysFortune: {
    totalFortuneTitle: string;
    totalFortuneDescription: string;
    wealthFortuneTitle: string;
    wealthFortuneDescription: string;
    loveFortuneTitle: string;
    loveFortuneDescription: string;
    businessFortuneTitle: string;
    businessFortuneDescription: string;
    healthFortuneTitle: string;
    healthFortuneDescription: string;
    studyFortuneTitle: string;
    studyFortuneDescription: string;
    luckyItemsTitle: string;
    luckyItem1: string;
    luckyItem2: string;
    luckyOutfitTitle: string;
    luckyOutfitDescription: string;
  };
  zodiacFortune: {
    zodiacTitle: string;
    zodiacMainDescription: string;
    zodiacSubDescription: string;
    yearOfBirth: string;
    imageUrl: string;
  };
  starSignFortune: {
    starSign: string;
    starMainDescription: string;
    starSubDescription: string;
    imageUrl: string;
    year: string;
  };
}

interface SavedSandbar {
  title: string;
  user_id: number;
  todays_fortune_id: number;
  zodiac_fortune_id: number;
  star_sign_fortune_id: number;
  id: number;
  saved_at: string;
}

interface TodayFortuneSaveType {
  savedSandbar: SavedSandbar;
}

export type ApiTodayFortuneSaveResponse = SuccessResponse<TodayFortuneSaveType>;
