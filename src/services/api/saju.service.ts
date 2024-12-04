import api from '@/lib/api';
import { ApiTodayFortuneResponse } from '@/types/fortuneType';

export const todayFortune = async (userId: number): Promise<ApiTodayFortuneResponse> => {
  try {
    const { data } = await api.get<ApiTodayFortuneResponse>(`/fortunes/today?userId=${userId}`);

    return data;
  } catch (error) {
    throw error;
  }
};
