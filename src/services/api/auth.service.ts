import api from '@/lib/api';
import { SuccessResponse } from '@/types/apiType';
import { SignupDto } from '@/types/signupType';

// 카카오 코드로 유저 유무 확인
export const kakaoAuth = async (code: string): Promise<any> => {
  const { data } = await api.get(`/auth/kakao/callback?code=${code}`);

  return data;
};

// 로그인
export const loginAuth = async (email: string): Promise<any> => {
  const { data } = await api.post('/auth/login', { email });

  return data;
};

// 회원가입
export const signupAuth = async (signupDto: SignupDto): Promise<any> => {
  const { data } = await api.post('/auth/register', signupDto);

  return data;
};

// 로그아웃
export const logoutAuth = async (): Promise<SuccessResponse<null>> => {
  const { data } = await api.post('/auth/logout');

  return data;
};

export const checkAuth = async (): Promise<SuccessResponse<null>> => {
  const { data } = await api.get('/auth/check');

  return data;
};
