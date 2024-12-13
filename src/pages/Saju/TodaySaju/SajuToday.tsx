import { LoadingBar, NavBar } from '@/components/Common';
import { HeaderInfo, ItemList, ResultButton } from '@/components/Saju/SajuToday';
import { MetaTag } from '@/components/Seo';
import { sajuMetaData } from '@/config/metaData';
import useRequireAuth from '@/hooks/useRequireAuth';

const SajuToday = () => {
  const {
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
  } = sajuMetaData.sajuToday;
  const { isLoading } = useRequireAuth();

  if (isLoading) {
    return <LoadingBar />;
  }
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
      <div className="w-full h-full flex flex-col items-center">
        <NavBar title="오늘의 사주" isResult={false} isBookmark={false} />
        <HeaderInfo />
        <ItemList />
        <ResultButton />
      </div>
    </>
  );
};

export default SajuToday;
