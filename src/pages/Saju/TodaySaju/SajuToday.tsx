import { LoadingBar, NavBar } from '@/components/Common';
import { HeaderInfo, ItemList, ResultButton } from '@/components/Saju/SajuToday';
import { MetaTag } from '@/components/Seo';
import { sajuMetaData } from '@/config/metaData';
import useRequireAuth from '@/hooks/useRequireAuth';
import { usePreTodayFortuneExplainQuery } from '@/services/queries/saju.query';
import { userIdSelector } from '@/stores/useAuthStore';
import { useRecoilValue } from 'recoil';

const SajuToday = () => {
  const {
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
  } = sajuMetaData.sajuToday;
  const userId = useRecoilValue(userIdSelector);
  const { isLoading } = useRequireAuth();

  usePreTodayFortuneExplainQuery(userId, {
    enabled: !!userId, // userId가 있을 때만 prefetch 실행
  });

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
      <div className="baseStyle">
        <NavBar title="오늘의 운세" isResult={false} isBookmark={false} />
        <HeaderInfo />
        <ItemList />
        <ResultButton />
      </div>
    </>
  );
};

export default SajuToday;
