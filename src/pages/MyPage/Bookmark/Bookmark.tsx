import { BackNavBar, LoadingBar, NotData } from '@/components/Common';
import { BookmarkFortuneTab, BookmarkItemList } from '@/components/MyPage/Bookmark';
import { MetaTag } from '@/components/Seo';
import { myPageMetaData } from '@/config/metaData';
import useRequireAuth from '@/hooks/useRequireAuth';
import { useGetBookmarkQuery } from '@/services/queries/myPage.query';
import { userIdSelector } from '@/stores/useAuthStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const Bookmark = () => {
  const {
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
  } = myPageMetaData.bookmark;

  const navigate = useNavigate();
  const { isLoading } = useRequireAuth();
  const userId = useRecoilValue(userIdSelector);

  const { data: bookmarksData, isLoading: bookmarksLoading } = useGetBookmarkQuery(Number(userId), {
    enabled: userId !== undefined,
  });

  const tabs = [
    { name: '전체', key: 'all' },
    { name: '운세', key: 'fortune' },
    { name: '타로', key: 'tarot' },
    { name: '작명', key: 'naming' },
    { name: '꿈해몽', key: 'dream' },
  ];

  const [activeTab, setActiveTab] = useState<string>('전체');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleCardClick = (data: any) => {
    switch (data.type) {
      case 'naming':
        navigate(`/myPage/bookmarkNamingCards/${userId}`);
        break;
      case 'dream':
        navigate(`/myPage/bookmarkDreamCards/${userId}`);
        break;
      case 'tarot':
        navigate(`/myPage/bookmarkTarotCards?tarotCardId=${data.id}`);
        break;
      case 'fortune':
        navigate(
          `/myPage/bookmarkFortuneCards?fortuneId=${data.todays_fortune_id}&zodiacId=${data.zodiac_fortune_id}&startId=${data.star_sign_fortune_id}`,
        );
        break;
      default:
        break;
    }
  };

  if (!userId || isLoading || bookmarksLoading) {
    return <LoadingBar />; // 로딩 상태 처리
  }

  const { savedTarot = [], savedFortune = [], hasSavedDream, hasSavedNaming } = bookmarksData || {};

  // 필터링된 데이터를 반환
  const filteredData = (() => {
    switch (activeTab) {
      case '운세':
        return savedFortune.map((item) => ({
          item: {
            id: item.id,
            title: item.title,
            created_at: item.created_at,
            type: 'fortune',
          },
          fullData: { ...item, type: 'fortune' },
        }));
      case '타로':
        return savedTarot.map((item) => ({
          item: { id: item.id, title: item.title, created_at: item.created_at, type: 'tarot' },
          fullData: { ...item, type: 'tarot' },
        }));
      case '작명':
        return hasSavedNaming ? [{ item: { id: 0, title: '나의 작명 결과보기' }, fullData: { type: 'naming' } }] : [];
      case '꿈해몽':
        return hasSavedDream ? [{ item: { id: 0, title: '나의 꿈해몽 결과보기' }, fullData: { type: 'dream' } }] : [];
      default:
        return [
          ...savedTarot.map((item) => ({
            item: { id: item.id, title: item.title, created_at: item.created_at, type: 'tarot' },
            fullData: { ...item, type: 'tarot' },
          })),
          ...savedFortune.map((item) => ({
            item: { id: item.id, title: item.title, created_at: item.created_at, type: 'fortune' },
            fullData: { ...item, type: 'fortune' },
          })),
          ...(hasSavedNaming ? [{ item: { id: 0, title: '나의 작명 결과보기' }, fullData: { type: 'naming' } }] : []),
          ...(hasSavedDream ? [{ item: { id: 0, title: '나의 꿈해몽 결과보기' }, fullData: { type: 'dream' } }] : []),
        ];
    }
  })();

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
        <BackNavBar title="저장보기" />
        <BookmarkFortuneTab tabs={tabs} activeTab={activeTab} setActiveTab={handleTabClick} />
        {
          // 북마크된 데이터가 없을 때
          filteredData.length === 0 ? (
            <NotData />
          ) : (
            <BookmarkItemList data={filteredData} handleCardClick={handleCardClick} />
          )
        }
      </div>
    </>
  );
};

export default Bookmark;
