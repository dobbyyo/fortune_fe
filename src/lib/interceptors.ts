import { ErrorResponse, SuccessResponse } from '@/types/apiType';
import { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { getCookie } from './cookieStorage';

export const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
	const jwtToken = getCookie('access_token');
	const csrfToken = getCookie('csrf-token');

	if (jwtToken) {
		config.headers.set('Authorization', `Bearer ${jwtToken}`);
	}

	if (csrfToken) {
		config.headers.set('csrf-token', csrfToken);
	}

	return config;
};

// 성공 인터셉터: 응답을 그대로 반환
export const successInterceptor = <T>(
	response: AxiosResponse<SuccessResponse<T>>,
): AxiosResponse<SuccessResponse<T>> => {
	return response;
};

// 에러 인터셉터: 상태 코드에 따라 에러 처리
export const errorInterceptor = async (error: AxiosError<ErrorResponse>): Promise<void> => {
	if (error.response?.status === 401) {
		return Promise.reject(error);
	} else if (error.response) {
		console.error('Error Status:', error.response.data.status);
		console.error('Error Message:', error.response.data.message);
		console.error('Error Path:', error.response.data.path);
		console.error('Error Timestamp:', error.response.data.timestamp);
		console.error('Error Data:', error.response.headers);
	} else {
		console.error('Unexpected Error:', error.message);
	}

	return Promise.reject(error);
};
