import { BackNavBar, Line, LoadingBar, NotData, ResponsiveImage } from '@/components/Common';
import { MetaTag } from '@/components/Seo';
import { myPageMetaData } from '@/config/metaData';
import useRequireAuth from '@/hooks/useRequireAuth';
import { useGetDetailNamingBookmark } from '@/services/queries/myPage.query';
import { useAiNamingBookmarkMutation, useAiNamingUnBookmarkMutation } from '@/services/queries/naming.query';
import { userIdSelector } from '@/stores/useAuthStore';
import { SavedNamingData } from '@/types/myPageType';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const BookmarkNamingCards = () => {
  const {
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
  } = myPageMetaData.bookmarkNamingCards;

  const { isLoading } = useRequireAuth();
  const userId = useRecoilValue(userIdSelector);
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

  const { data: bookmarksData, isLoading: bookmarksLoading } = useGetDetailNamingBookmark(
    { userId: Number(userId) },
    {
      enabled: userId !== undefined,
    },
  );

  useEffect(() => {
    if (bookmarksData?.savedNaming) {
      const ids = bookmarksData.savedNaming.map((naming) => naming.id);
      setBookmarkedIds(ids);
    }
  }, [bookmarksData]);

  const isBookmarked = (id: number) => bookmarkedIds.includes(id);
  const { mutate: bookmark } = useAiNamingBookmarkMutation();
  const { mutate: unBookmark } = useAiNamingUnBookmarkMutation();

  const handleBookmarkToggle = (naming: SavedNamingData) => {
    if (!userId) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }

    if (isBookmarked(naming.id)) {
      // 북마크 해제
      unBookmark(
        { payload: { id: naming.id } },
        {
          onSuccess: () => {
            setBookmarkedIds((prev) => prev.filter((itemId) => itemId !== naming.id));
          },
          onError: () => {
            alert('북마크 해제에 실패했습니다.');
          },
        },
      );
    } else {
      // 북마크 추가
      setBookmarkedIds((prev) => [...prev, naming.id]); // **API 응답 전에 즉시 업데이트**

      bookmark(
        {
          payload: {
            mainTitle: naming.naming.mainTitle,
            namings: [
              {
                name: naming.name,
                description: naming.description,
              },
            ],
          },
        },
        {
          onError: () => {
            setBookmarkedIds((prev) => prev.filter((itemId) => itemId !== naming.id));

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
        <BackNavBar title="작명 저장보기" />
        <Line />

        <div className="w-full space-y-4 px-2">
          {bookmarksData && bookmarksData.savedNaming.length === 0 ? (
            <NotData />
          ) : (
            <>
              {bookmarksData &&
                bookmarksData.savedNaming.map((item) => (
                  <div
                    key={item.id}
                    className="relative border rounded-lg p-4 flex items-center justify-between shadow-sm"
                  >
                    <div className="mr-5">
                      <div className="absolute left-2 top-6">
                        <button className="w-[30px] h-[30px]" onClick={() => handleBookmarkToggle(item)}>
                          <ResponsiveImage
                            webpSrc={
                              isBookmarked(item.id) ? '/dream/webp/bookmark_2.webp' : '/dream/webp/bookmark_1.webp'
                            }
                            pngSrc={isBookmarked(item.id) ? '/dream/png/bookmark_2.png' : '/dream/png/bookmark_1.png'}
                            alt="북마크"
                            className="w-full h-full object-cover"
                          />
                        </button>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[20px] sm:text-[25px] font-bold text-center mb-5">{item.name}</h3>
                      <p className="text-[15px] sm:text-[20px] font-normal text-start">{item.description}</p>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BookmarkNamingCards;
