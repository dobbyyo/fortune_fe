import { LoadingBar } from '@/components/Common';
import { MyPageNavBar } from '@/components/MyPage';
import { Bottom, Profile } from '@/components/MyPage/Home';
import { MetaTag } from '@/components/Seo';
import { myPageMetaData } from '@/config/metaData';
import useRequireAuth from '@/hooks/useRequireAuth';

const MyPage = () => {
  const {
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
  } = myPageMetaData.myPage;

  const { isLoading } = useRequireAuth();

  if (isLoading) {
    return <LoadingBar />; // 로딩 상태 처리
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
        {/* 상단 네비게이션 */}
        <MyPageNavBar />

        {/* 프로필 정보 */}
        <Profile />

        {/* 하단 메뉴 */}
        <Bottom />
      </div>
    </>
  );
};

export default MyPage;
