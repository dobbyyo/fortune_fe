import api from '@/lib/api';
import { ApiUserDataResponse } from '@/types/userType';

// 내 정보
export const myDataUser = async (): Promise<ApiUserDataResponse> => {
	try {
		const { data } = await api.get<ApiUserDataResponse>('/users/myInfo');

		return data;
	} catch (error) {
		throw error;
	}
};
