import { CategoryWrapper, HomeSearch } from '@/components/Home';
import { MetaTag } from '@/components/Seo';
import { mainMetaData } from '@/config/metaData';
import { useCheckAuthQuery } from '@/services/queries/auth.query';

const Home = () => {
  const {
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
  } = mainMetaData.home;

  useCheckAuthQuery();

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
        <HomeSearch />
        <CategoryWrapper />
      </div>
    </>
  );
};

export default Home;
