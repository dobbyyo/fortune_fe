import { useKaKaoAuth, useLoginQuery } from '@/services/queries/auth.query';
import { authState, userState } from '@/stores/useAuthStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

const Auth = () => {
	const navigate = useNavigate(); // 페이지 이동 함수
	const params = new URLSearchParams(window.location.search);
	const code = params.get('code'); // URL에서 `code` 추출
	const setUserState = useSetRecoilState(userState);
	const setAuthState = useSetRecoilState(authState);

	const { data: kakaoData, isLoading: kakaoIsLoading, isError: kakaoIsError } = useKaKaoAuth(code || '');

	const { mutateAsync: loginMutation, isPending: loginIsLoading, isError: loginIsError } = useLoginQuery(); // 로그인 Mutation

	useEffect(() => {
		const handleKakaoLogin = async () => {
			if (kakaoData && !kakaoIsLoading && !kakaoIsError) {
				const { userExist, email, nickname, avatar } = kakaoData.data;

				if (userExist) {
					await loginMutation(email);
					navigate('/');
				} else {
					setUserState((prev) => ({
						...prev,
						email,
						username: nickname,
						profile: { user_id: null, profile_url: avatar },
					})); // 유저 정보 변경
					navigate('/signup');
				}
			}
		};

		handleKakaoLogin();
	}, [kakaoData, kakaoIsLoading, kakaoIsError, loginMutation, navigate]);

	// 로딩 상태 처리
	if (kakaoIsLoading || loginIsLoading) return <div>잠시만 기다려주세요...</div>;

	// 에러 상태 처리
	if (kakaoIsError || loginIsError) return <div>인증에 실패했습니다.</div>;

	return <div>인증 처리 중...</div>;
};

export default Auth;
