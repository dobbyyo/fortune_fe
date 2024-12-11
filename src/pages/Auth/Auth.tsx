import { ErrorModal, LoadingBar } from '@/components/Common';
import { useKaKaoAuth, useLoginQuery } from '@/services/queries/auth.query';
import { userState } from '@/stores/useAuthStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

const Auth = () => {
  const navigate = useNavigate(); // 페이지 이동 함수
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code'); // URL에서 `code` 추출
  const setUserState = useSetRecoilState(userState);

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
          setUserState((prev: any) => ({
            ...(prev || {}), // prev가 null일 경우 기본값을 빈 객체로 설정
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
  if (kakaoIsLoading || loginIsLoading) return <LoadingBar />;

  // 에러 상태 처리
  if (kakaoIsError || loginIsError) return <ErrorModal />;

  return null;
};

export default Auth;
