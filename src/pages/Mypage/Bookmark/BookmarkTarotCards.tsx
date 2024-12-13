import { BackNavBar, Line, LoadingBar } from '@/components/Common';
import { BookmarkTarotCardsList } from '@/components/MyPage/Bookmark';
import { MetaTag } from '@/components/Seo';
import { myPageMetaData } from '@/config/metaData';
import useRequireAuth from '@/hooks/useRequireAuth';

const BookmarkTarotCards = () => {
  const {
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
  } = myPageMetaData.bookmarkTarotCards;

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
        <BackNavBar title="북마크 타로카드" />
        <Line />

        <BookmarkTarotCardsList />
      </div>
    </>
  );
};

export default BookmarkTarotCards;
