import { useMutation, useQuery } from '@tanstack/react-query';
import { kakaoAuth, loginAuth } from '../api/auth.service';

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
	return useMutation({
		mutationKey: ['loginAuth'],
		mutationFn: async (email: string) => {
			const response = await loginAuth(email);
			return response;
		},
	});
};
