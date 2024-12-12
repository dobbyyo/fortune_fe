import { BackNavBar, Line, LoadingBar, NotData } from '@/components/Common';
import useRequireAuth from '@/hooks/useRequireAuth';
import { useAiDreamBookmarkDeleteMutation, useAiDreamBookmarkMutation } from '@/services/queries/dream.query';
import { useGetDetailDreamBookmark } from '@/services/queries/myPage.query';
import { userIdSelector } from '@/stores/useAuthStore';
import { SavedDreamData } from '@/types/myPageType';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const BookmarkDreamCards = () => {
  const { isLoading } = useRequireAuth();
  const userId = useRecoilValue(userIdSelector);
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

  const { data: bookmarksData, isLoading: bookmarksLoading } = useGetDetailDreamBookmark(
    { userId: Number(userId) },
    {
      enabled: userId !== undefined,
    },
  );

  useEffect(() => {
    if (bookmarksData?.savedDream) {
      const ids = bookmarksData.savedDream.map((dream) => dream.id);
      setBookmarkedIds(ids);
    }
  }, [bookmarksData]);

  const isBookmarked = (id: number) => bookmarkedIds.includes(id);
  const { mutate: bookmark } = useAiDreamBookmarkMutation();
  const { mutate: unBookmark } = useAiDreamBookmarkDeleteMutation();

  const handleBookmarkToggle = (dream: SavedDreamData) => {
    if (!userId) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }

    if (isBookmarked(dream.id)) {
      // 북마크 해제
      unBookmark(
        { payload: { id: dream.id } },
        {
          onSuccess: () => {
            setBookmarkedIds((prev) => prev.filter((itemId) => itemId !== dream.id));
          },
          onError: () => {
            alert('북마크 해제에 실패했습니다.');
          },
        },
      );
    } else {
      // 북마크 추가
      setBookmarkedIds((prev) => [...prev, dream.id]); // **API 응답 전에 즉시 업데이트**

      bookmark(
        {
          payload: {
            mainTitle: dream.title,
            user_description: dream.user_description,
            ai_interpretation: dream.description,
          },
        },
        {
          onError: () => {
            setBookmarkedIds((prev) => prev.filter((itemId) => itemId !== dream.id));

            alert('북마크 추가에 실패했습니다.');
          },
        },
      );
    }
  };

  if (isLoading || bookmarksLoading) {
    return <LoadingBar />;
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <BackNavBar title="꿈해몽 저장보기" />
      <Line />

      <div className="w-full">
        {bookmarksData && bookmarksData.savedDream.length === 0 ? (
          <NotData />
        ) : (
          <>
            {bookmarksData &&
              bookmarksData.savedDream.map((dream) => (
                <div key={dream.id} className="space-y-4 px-5 w-full pb-5 pt-10 border-2 shadow-xl mt-6">
                  <div className="relative border rounded-lg p-4 flex items-center justify-between shadow-sm">
                    <div className="absolute left-2 top-6">
                      <button className="w-[30px] h-[30px]" onClick={() => handleBookmarkToggle(dream)}>
                        <img
                          src={isBookmarked(dream.id) ? '/on-bookmark-icon.jpg' : '/off-bookmark-icon.jpg'}
                          alt="북마크"
                          className="w-full h-full object-contain"
                        />
                      </button>
                    </div>
                    <div className="w-full">
                      <h3 className="text-[20px] sm:text-[35px] font-bold text-center mb-5">{dream.title}</h3>
                      <p className="text-[15px] sm:text-[30px] font-normal text-start">{dream.user_description}</p>
                    </div>
                  </div>

                  <div className="pt-10 text-start">
                    <h2 className="text-[20px] sm:text-[30px] font-bold">해몽</h2>
                    <p className="text-[15px] sm:text-[25px] font-normal mt-5">{dream.description}</p>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default BookmarkDreamCards;
