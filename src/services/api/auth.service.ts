import api from '@/lib/api';
import { SuccessResponse } from '@/types/apiType';
import { SignupDto } from '@/types/signupType';

// 카카오 코드로 유저 유무 확인
export const kakaoAuth = async (code: string): Promise<any> => {
  try {
    const { data } = await api.get(`/auth/kakao/callback?code=${code}`);

    return data;
  } catch (error) {
    throw error;
  }
};

// 로그인
export const loginAuth = async (email: string): Promise<any> => {
  try {
    const { data } = await api.post('/auth/login', { email });

    return data;
  } catch (error) {
    throw error;
  }
};

// 회원가입
export const signupAuth = async (signupDto: SignupDto): Promise<any> => {
  try {
    const { data } = await api.post('/auth/register', signupDto);

    return data;
  } catch (error) {
    throw error;
  }
};

// 로그아웃
export const logoutAuth = async (): Promise<SuccessResponse<null>> => {
  try {
    const { data } = await api.post('/auth/logout');

    return data;
  } catch (error) {
    throw error;
  }
};

// 로그인 체크
export const checkAuth = async (): Promise<SuccessResponse<null>> => {
  try {
    const { data } = await api.get('/auth/check');

    return data;
  } catch (error) {
    throw error;
  }
};

// 탈퇴하기
export const withdrawalAuth = async (userId: number): Promise<SuccessResponse<null>> => {
  try {
    const { data } = await api.post(`/auth/withdrawal/${userId}`);

    return data;
  } catch (error) {
    throw error;
  }
};
