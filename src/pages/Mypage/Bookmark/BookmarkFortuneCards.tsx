import { BackNavBar, Line, LoadingBar } from '@/components/Common';
import {
  BookmarkFortuneList,
  BookmarkFortuneTab,
  BookmarkStarList,
  BookmarkZodiacList,
} from '@/components/MyPage/Bookmark';
import useRequireAuth from '@/hooks/useRequireAuth';
import { useGetDetailFortuneBookmark } from '@/services/queries/myPage.query';
import { userIdSelector } from '@/stores/useAuthStore';
import { SavedStarData, SavedTFortuneData, SavedZodiacData } from '@/types/myPageType';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const BookmarkFortuneCards = () => {
  const { isLoading } = useRequireAuth();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const fortuneId = queryParams.get('fortuneId');
  const zodiacId = queryParams.get('zodiacId');
  const startId = queryParams.get('startId');
  const userId = useRecoilValue(userIdSelector);

  const [activeTab, setActiveTab] = useState('오늘의 운세');

  const tabs = [
    { name: '오늘의 운세', key: 'today' },
    { name: '띠 운세', key: 'zodiac' },
    { name: '별자리 운세', key: 'stars' },
  ];

  const { data: getDetailFortuneBookmark, isLoading: getDetailFortuneBookmarkLoading } = useGetDetailFortuneBookmark(
    {
      userId: Number(userId),
      fortuneId: Number(fortuneId),
      zodiacId: Number(zodiacId),
      startId: Number(startId),
    },
    {
      enabled: userId !== undefined && fortuneId !== undefined && zodiacId !== undefined && startId !== undefined,
    },
  );

  const [explainsFortune, setExplainsFortune] = useState<SavedTFortuneData | null>(
    getDetailFortuneBookmark?.savedFortune.savedFortuneCards || null,
  );
  const [explainsZodiac, setExplainsZodiac] = useState<SavedZodiacData | null>(
    getDetailFortuneBookmark?.savedFortune.savedZodiacs || null,
  );
  const [explainsStar, setExplainsStar] = useState<SavedStarData | null>(
    getDetailFortuneBookmark?.savedFortune.savedStars || null,
  );

  useEffect(() => {
    if (getDetailFortuneBookmark) {
      setExplainsFortune(getDetailFortuneBookmark.savedFortune.savedFortuneCards);
      setExplainsZodiac(getDetailFortuneBookmark.savedFortune.savedZodiacs);
      setExplainsStar(getDetailFortuneBookmark.savedFortune.savedStars);
    }
  }, [getDetailFortuneBookmark]);

  const renderTabContent = () => {
    const tabContentMap: { [key: string]: JSX.Element } = {
      today: explainsFortune ? <BookmarkFortuneList explainsFortune={explainsFortune} /> : <LoadingBar />,
      zodiac: explainsZodiac ? <BookmarkZodiacList explainsZodiac={explainsZodiac} /> : <LoadingBar />,
      stars: explainsStar ? <BookmarkStarList explainsStar={explainsStar} /> : <LoadingBar />,
    };

    const activeTabKey: string = tabs.find((tab) => tab.name === activeTab)?.key || 'today';
    return tabContentMap[activeTabKey] || <div>탭을 선택하세요</div>;
  };

  if (isLoading || getDetailFortuneBookmarkLoading) {
    return <LoadingBar />; // 로딩 상태 처리
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <BackNavBar title="북마크 오늘의 운세" />
      <Line />

      <BookmarkFortuneTab tabs={tabs} setActiveTab={setActiveTab} activeTab={activeTab} />

      {renderTabContent()}
    </div>
  );
};

export default BookmarkFortuneCards;
