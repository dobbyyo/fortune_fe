import { LoadingBar } from '@/components/Common';
import useRequireAuth from '@/hooks/useRequireAuth';

const BookmarkNamingCards = () => {
  const { isLoading } = useRequireAuth();

  if (isLoading) {
    return <LoadingBar />;
  }

  return <div>BookmarkNamingCards</div>;
};

export default BookmarkNamingCards;
