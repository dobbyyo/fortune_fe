import { LoginButton, LoginIcon } from '@/components/Login';
import { MetaTag } from '@/components/Seo';
import { authMetaData } from '@/config/metaData';
import { authState } from '@/stores/useAuthStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const Login = () => {
  const {
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
  } = authMetaData.login;

  const auth = useRecoilValue(authState);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/');
    }
  }, [auth]);

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
        <LoginIcon />
        <LoginButton />
      </div>
    </>
  );
};

export default Login;
