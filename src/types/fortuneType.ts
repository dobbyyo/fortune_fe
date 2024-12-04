import { SuccessResponse } from '@/types/apiType';

export interface HeavenlyData {
  year: string;
  month: string;
  day: string;
  hour: string;
  elements: ElementsData;
}

export interface EarthlyData {
  year: string;
  month: string;
  day: string;
  hour: string;
  elements: ElementsData;
}

export interface ElementsData {
  baseElements: BaseElements;
  img: ElementImages;
}

export interface BaseElements {
  year: string;
  month: string;
  day: string;
  hour: string;
}

export interface ElementImages {
  year: string;
  month: string;
  day: string;
  hour: string;
}

export interface TenGodData {
  year: string;
  month: string;
  day: string;
  hour: string;
}

export interface TwelveStatesData {
  year: string;
  month: string;
  day: string;
  hour: string;
}

export interface TwelveGodData {
  year: string;
  month: string;
  day: string;
  hour: string;
}

export interface FortunesData {
  heavenly: HeavenlyData;
  earthly: EarthlyData;
  heavenlyStemTenGod: TenGodData;
  earthlyBranchTenGod: TenGodData;
  tenStemTwelveStates: TwelveStatesData;
  twelveGod: TwelveGodData;
}

export interface TodayFortuneType {
  fortunesData: FortunesData;
}

export type ApiTodayFortuneResponse = SuccessResponse<TodayFortuneType>;
