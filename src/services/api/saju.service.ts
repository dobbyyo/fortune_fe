import api from '@/lib/api';
import {
  ApiConstellationFortuneResponse,
  ApiTodayFortuneExplanationResponse,
  ApiTodayFortuneResponse,
  ApiTodayFortuneSaveResponse,
  ApiTodayZodiacFortuneExplanationResponse,
  todayFortuneSavePayloadType,
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

// 오늘의 운세 저장
export const todayFortuneSave = async (
  todayFortuneSavePayload: todayFortuneSavePayloadType,
): Promise<ApiTodayFortuneSaveResponse> => {
  try {
    const { data } = await api.post('/fortunes/save', todayFortuneSavePayload);

    return data;
  } catch (error) {
    throw error;
  }
};

// 오늘의 운세 삭제
export const todayFortuneDelete = async (payload: { userId: number; sandbarId: number }): Promise<void> => {
  try {
    const { data } = await api.delete('/fortunes/delete', {
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
};
