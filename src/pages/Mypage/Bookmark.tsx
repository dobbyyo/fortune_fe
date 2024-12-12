import { BackNavBar, LoadingBar } from '@/components/Common';
import { BookmarkItemList, BookmarkTab } from '@/components/MyPage/Bookmark';
import useRequireAuth from '@/hooks/useRequireAuth';
import { useGetBookmarkQuery } from '@/services/queries/myPage.query';
import { userIdSelector } from '@/stores/useAuthStore';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

const Bookmark = () => {
  const { isLoading } = useRequireAuth();
  const userId = useRecoilValue(userIdSelector);

  const { data: bookmarksData, isLoading: bookmarksLoading } = useGetBookmarkQuery(Number(userId), {
    enabled: userId !== undefined,
  });

  const tabs = ['전체', '운세', '타로', '작명', '꿈해몽'];

  const [activeTab, setActiveTab] = useState<string>('전체');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleCardClick = (data: any) => {
    console.log('Clicked Data:', data);
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
          item: { id: item.id, title: item.title, created_at: item.created_at },
          fullData: item,
        }));
      case '타로':
        return savedTarot.map((item) => ({
          item: { id: item.id, title: item.title, created_at: item.created_at },
          fullData: item,
        }));
      case '작명':
        return hasSavedNaming ? [{ item: { id: 0, title: '나의 작명 결과보기' }, fullData: { type: 'naming' } }] : [];
      case '꿈해몽':
        return hasSavedDream ? [{ item: { id: 0, title: '나의 꿈해몽 결과보기' }, fullData: { type: 'dream' } }] : [];
      default:
        return [
          ...savedTarot.map((item) => ({
            item: { id: item.id, title: item.title, created_at: item.created_at },
            fullData: item,
          })),
          ...savedFortune.map((item) => ({
            item: { id: item.id, title: item.title, created_at: item.created_at },
            fullData: item,
          })),
          ...(hasSavedNaming ? [{ item: { id: 0, title: '나의 작명 결과보기' }, fullData: { type: 'naming' } }] : []),
          ...(hasSavedDream ? [{ item: { id: 0, title: '나의 꿈해몽 결과보기' }, fullData: { type: 'dream' } }] : []),
        ];
    }
  })();

  return (
    <div className="w-full h-full flex flex-col items-center mt-10">
      <BackNavBar title="저장보기" />
      <BookmarkTab tabs={tabs} handleTabClick={handleTabClick} activeTab={activeTab} />
      <BookmarkItemList data={filteredData} handleCardClick={handleCardClick} />
    </div>
  );
};

export default Bookmark;
