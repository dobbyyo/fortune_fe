import api from '@/lib/api';
import { SignupDto } from '@/types/signupType';

// 카카오 코드로 유저 유무 확인
export const kakaoAuth = async (code: string): Promise<any> => {
	const { data } = await api.get(`/auth/kakao/callback?code=${code}`);

	return data;
};

// 로그인
export const loginAuth = async (email: string): Promise<any> => {
	const { data } = await api.post('/auth/login', { email });
	console.log('service', data);
	return data;
};

// 회원가입
export const signupAuth = async (signupDto: SignupDto): Promise<any> => {
	const { data } = await api.post('/auth/register', signupDto);

	return data;
};
