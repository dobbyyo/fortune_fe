import api from '@/lib/api';
import { ApiTodayFortuneExplanationResponse, ApiTodayFortuneResponse } from '@/types/fortuneType';

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
