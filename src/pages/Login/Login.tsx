import { MetaTag } from '@/components/Seo';
import { config } from '@/config/config';
import { authMetaData } from '@/config/metaData';

const Login = () => {
  const {
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
  } = authMetaData.login;

  const { kakaoApiKey, kakaoRedirectUri } = config;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoApiKey}&redirect_uri=${kakaoRedirectUri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <>
      <MetaTag
        title={metaTitle}
        description={metaDescription}
        keywords={keywords}
        canonical={canonical}
        ogTitle={ogTitle}
        ogDescription={ogDescription}
      />
      <div className="flex flex-col items-center justify-center">
        <div>
          <img
            src="/login-icon.jpg"
            alt="logo"
            className="w-[200px] h-[220px] sm:w-[300px] sm:h-[330px] md:w-[366px] md:h-[403px] mx-auto mt-10"
          />
        </div>
        <button
          className="btn btn-warning bg-[#FFD34B] border-none w-[280px] h-[50px] text-[18px] 
				sm:w-[400px] sm:h-[60px] sm:text-[22px] 
				md:w-[800px] md:h-[68px] md:text-[30px] 
				rounded-[30px] font-bold mt-6"
          onClick={handleLogin}
        >
          카카오톡으로 로그인
        </button>
      </div>
    </>
  );
};

export default Login;
