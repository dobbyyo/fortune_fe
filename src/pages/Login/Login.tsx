import { LoginButton, LoginIcon } from '@/components/Login';
import { MetaTag } from '@/components/Seo';
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
