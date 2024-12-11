import api from '@/lib/api';
import { ApiUserDataResponse, ApiUserUpdateDataResponse, UserUpdatePayload } from '@/types/userType';

// 내 정보
export const myDataUser = async (): Promise<ApiUserDataResponse> => {
  try {
    const { data } = await api.get<ApiUserDataResponse>('/users/myInfo');

    return data;
  } catch (error) {
    throw error;
  }
};

// 내 정보 수정
export const updateMyDataUser = async (payload: UserUpdatePayload): Promise<ApiUserUpdateDataResponse> => {
  try {
    const response = await api.patch<ApiUserUpdateDataResponse>('/users/updateMyInfo', {
      ...payload,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
