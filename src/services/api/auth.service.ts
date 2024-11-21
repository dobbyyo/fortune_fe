import api from '@/lib/api';

export const kakaoAuth = async (code: string): Promise<any> => {
	const { data } = await api.get(`/auth/kakao/callback?code=${code}`);

	return data;
};

export const loginAuth = async (email: string): Promise<any> => {
	const { data } = await api.post('/auth/login', { email });

	return data;
};
