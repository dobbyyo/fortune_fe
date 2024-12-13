import { MetaTag } from '@/components/Seo';
import { SignupAgreements, SignupBar, SignupButton, SignupForm, SignUpTitle } from '@/components/Signup';
import { authMetaData } from '@/config/metaData';

const Signup = () => {
  const {
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
  } = authMetaData.signup;

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
        <SignUpTitle />
        <SignupBar />
        <SignupForm />
        <SignupAgreements />
        <SignupButton />
      </div>
    </>
  );
};

export default Signup;
