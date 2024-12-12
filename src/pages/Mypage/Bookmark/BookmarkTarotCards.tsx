import { BackNavBar, Line, LoadingBar } from '@/components/Common';
import { BookmarkTarotCardsList } from '@/components/MyPage/Bookmark';
import useRequireAuth from '@/hooks/useRequireAuth';

const BookmarkTarotCards = () => {
  const { isLoading } = useRequireAuth();

  if (isLoading) {
    return <LoadingBar />; // 로딩 상태 처리
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <BackNavBar title="북마크 타로카드" />
      <Line />

      <BookmarkTarotCardsList />
    </div>
  );
};

export default BookmarkTarotCards;
