import { LoadingBar } from '@/components/Common';
import useRequireAuth from '@/hooks/useRequireAuth';

const BookmarkDreamCards = () => {
  const { isLoading } = useRequireAuth();

  if (isLoading) {
    return <LoadingBar />;
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div></div>
    </div>
  );
};

export default BookmarkDreamCards;
