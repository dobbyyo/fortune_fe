import { useMutation, useQuery } from '@tanstack/react-query';
import { kakaoAuth, loginAuth, signupAuth } from '../api/auth.service';
import { SignupDto } from '@/types/signupType';
import { authState, userState } from '@/stores/useAuthStore';
import { useSetRecoilState } from 'recoil';

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
			console.log(data);
			setAuthState(true);
			setUserState((prev) => ({
				...prev,
				...data.data,
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
