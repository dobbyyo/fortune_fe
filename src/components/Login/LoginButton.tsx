import { config } from '@/config/config';

const LoginButton = () => {
  const { kakaoApiKey, kakaoRedirectUri } = config;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoApiKey}&redirect_uri=${kakaoRedirectUri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <button
      className="btn btn-warning bg-[#FFD34B] border-none w-[280px] h-[50px] text-[15px] 
        sm:w-[320px] sm:h-[60px] sm:text-[18px] 
        md:w-[400px] md:h-[68px] md:text-[22px] 
        rounded-[30px] font-bold mt-6"
      onClick={handleLogin}
    >
      카카오톡으로 로그인
    </button>
  );
};

export default LoginButton;
