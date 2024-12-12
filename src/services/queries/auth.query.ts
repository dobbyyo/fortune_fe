import { useMutation, useQuery } from '@tanstack/react-query';
import { checkAuth, kakaoAuth, loginAuth, logoutAuth, signupAuth, withdrawalAuth } from '../api/auth.service';
import { SignupDto } from '@/types/signupType';
import { authState, userState } from '@/stores/useAuthStore';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { loadingState } from '@/stores/useLoadingStore';
import { errorState } from '@/stores/useErrorStore';

export const useKaKaoAuth = (code: string) => {
  return useQuery<any>({
    queryKey: ['kakaoAuth', { code }],
    queryFn: async () => {
      const response = await kakaoAuth(code); // API 호출
      return response; // 응답 데이터 반환
    },
    enabled: !!code, // code가 있을 때만 실행
  });
};

export const useLoginQuery = () => {
  const setAuthState = useSetRecoilState(authState);
  const setUserState = useSetRecoilState(userState);

  return useMutation({
    mutationKey: ['loginAuth'],
    mutationFn: async (email: string) => {
      const response = await loginAuth(email);
      return response;
    },
    onSuccess: ({ data }) => {
      const { accessToken, refreshToken, ...userData } = data.myInfo;
      setAuthState({ isLoading: false, isAuthenticated: true });
      setUserState((prev) => ({
        ...prev,
        ...userData,
      }));
    },
  });
};

export const useSignupQuery = () => {
  return useMutation({
    mutationKey: ['signupAuth'],
    mutationFn: async (signupDto: SignupDto) => {
      const response = await signupAuth(signupDto);
      return response;
    },
    onSuccess: () => {},
  });
};

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const setAuthState = useSetRecoilState(authState);
  const setUserState = useSetRecoilState(userState);
  const setLoading = useSetRecoilState(loadingState);
  const setError = useSetRecoilState(errorState);

  return useMutation({
    mutationKey: ['logoutAuth'],
    mutationFn: async () => {
      setLoading(true);
      const response = await logoutAuth();
      return response;
    },
    onSuccess: () => {
      localStorage.clear();
      sessionStorage.clear();
      setLoading(false);
      setAuthState({ isLoading: false, isAuthenticated: false });
      setUserState(null);
      navigate('/');
    },
    onSettled: () => {
      setLoading(false);
      setAuthState({ isLoading: false, isAuthenticated: false });
      setUserState(null);
    },
    onError: () => {
      setLoading(false);
      setError(true);
    },
  });
};

export const useCheckAuthQuery = () => {
  return useQuery({
    queryKey: ['check'],
    queryFn: async () => {
      const response = await checkAuth();
      return response;
    },
    retry: 1,
  });
};

export const useWithdrawalMutation = () => {
  const navigate = useNavigate();
  const setAuthState = useSetRecoilState(authState);
  const setUserState = useSetRecoilState(userState);
  const setLoading = useSetRecoilState(loadingState);
  const setError = useSetRecoilState(errorState);

  return useMutation({
    mutationKey: ['withdrawalAuth'],
    mutationFn: async (userId: number) => {
      setLoading(true);
      const response = await withdrawalAuth(userId);
      return response.data;
    },
    onSuccess: async () => {
      setLoading(false);
      setAuthState({ isLoading: false, isAuthenticated: false });
      setUserState(null);
      navigate('/');
    },
    onError: () => {
      setLoading(false);
      setError(true);
    },
  });
};
