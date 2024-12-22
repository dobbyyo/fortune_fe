import { config } from '@/config/config';

const LoginButton = () => {
  const { kakaoApiKey, kakaoRedirectUri } = config;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoApiKey}&redirect_uri=${kakaoRedirectUri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <button
      className="btn btn-warning bg-[#FFD34B] border-none w-[280px] h-[50px] text-[18px] 
        sm:w-[400px] sm:h-[60px] sm:text-[22px] 
        md:w-[800px] md:h-[68px] md:text-[30px] 
        rounded-[30px] font-bold mt-6"
      onClick={handleLogin}
    >
      카카오톡으로 로그인
    </button>
  );
};

export default LoginButton;
