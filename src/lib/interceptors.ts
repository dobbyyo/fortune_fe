import { ErrorResponse, SuccessResponse } from '@/types/apiType';
import { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { getCookie } from './cookieStorage';

export const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
	const jwtToken = getCookie('jwt_token');
	const csrfToken = getCookie('csrf-token');

	console.log('Request URL:', jwtToken, csrfToken);
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
	console.log('Success Message:', response.data.message);
	console.log('Success Data:', response.data.data);
	return response;
};

// 에러 인터셉터: 상태 코드에 따라 에러 처리
export const errorInterceptor = async (error: AxiosError<ErrorResponse>): Promise<void> => {
	if (error.response?.status === 401) {
		console.warn('Unauthorized! Redirecting to login...');
		window.location.href = '/login';
		await Promise.reject(error);
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
