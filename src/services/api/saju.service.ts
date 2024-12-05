import api from '@/lib/api';
import {
  ApiConstellationFortuneResponse,
  ApiTodayFortuneExplanationResponse,
  ApiTodayFortuneResponse,
  ApiTodayZodiacFortuneExplanationResponse,
} from '@/types/fortuneType';

// 오늘의 운세 조회
export const todayFortune = async (userId: number): Promise<ApiTodayFortuneResponse> => {
  try {
    const { data } = await api.get<ApiTodayFortuneResponse>(`/fortunes/today?userId=${userId}`);

    return data;
  } catch (error) {
    throw error;
  }
};

// 오늘의 운세 해석
export const todayFortuneExplain = async (userId: number): Promise<ApiTodayFortuneExplanationResponse> => {
  try {
    const { data } = await api.get<ApiTodayFortuneExplanationResponse>(`/fortunes/explanation?userId=${userId}`);

    return data;
  } catch (error) {
    throw error;
  }
};

// 띠 운세 조회
export const todayZodiacFortuneExplain = async (userId: number): Promise<ApiTodayZodiacFortuneExplanationResponse> => {
  try {
    const { data } = await api.get<ApiTodayZodiacFortuneExplanationResponse>(`/fortunes/zodiac?userId=${userId}`);

    return data;
  } catch (error) {
    throw error;
  }
};

// 별자리 운세 조회
export const todayConstellationFortune = async (userId: number): Promise<ApiConstellationFortuneResponse> => {
  try {
    const { data } = await api.get<ApiConstellationFortuneResponse>(`/fortunes/constellation?userId=${userId}`);

    return data;
  } catch (error) {
    throw error;
  }
};
