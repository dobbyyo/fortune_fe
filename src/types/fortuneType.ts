import { SuccessResponse } from '@/types/apiType';

// 오늘의 운세 조회
export interface BaseElements {
  year: string;
  month: string;
  day: string;
  hour: string;
}

export interface ElementsData {
  baseElements: BaseElements;
  img: BaseElements;
}

export interface HeavenlyEarthlyData {
  year: string;
  month: string;
  day: string;
  hour: string;
  elements: ElementsData;
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
