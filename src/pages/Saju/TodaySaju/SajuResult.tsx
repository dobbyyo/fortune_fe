import { LoadingBar, NavBar } from '@/components/Common';
import { StarSignFortune, TodayFortune, ZodiacFortune } from '@/components/Saju/SajuResult';
import { MetaTag } from '@/components/Seo';
import { sajuMetaData } from '@/config/metaData';
import useRequireAuth from '@/hooks/useRequireAuth';
import { getLocalStorage } from '@/lib/localStorage';
import {
  mapStarSignFortuneData,
  mapTodayFortuneData,
  mapZodiacFortuneData,
} from '@/services/payloadData/SajuResultPayload';
import { useTodayFortuneDeleteMutation, useTodayFortuneSaveMutation } from '@/services/queries/saju.query';
import { authState, userState } from '@/stores/useAuthStore';
import { explainFortuneState, fortuneConstellationState, fortuneZodiacState } from '@/stores/useSajuStore';
import { todayFortuneSavePayloadType } from '@/types/fortuneType';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

const SajuResult = () => {
  const {
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
  } = sajuMetaData.sajuResult;

  const [activeTab, setActiveTab] = useState('오늘의 운세');
  const { isLoading } = useRequireAuth();

  const tabs = [
    { name: '오늘의 운세', key: 'today' },
    { name: '띠 운세', key: 'zodiac' },
    { name: '별자리 운세', key: 'stars' },
  ];

  const renderTabContent = () => {
    const tabContentMap: { [key: string]: JSX.Element } = {
      today: <TodayFortune />,
      zodiac: <ZodiacFortune />,
      stars: <StarSignFortune />,
    };

    const activeTabKey: string = tabs.find((tab) => tab.name === activeTab)?.key || 'today';
    return tabContentMap[activeTabKey] || <div>탭을 선택하세요</div>;
  };

  const { mutate: bookMarkMutate } = useTodayFortuneSaveMutation();
  const { mutate: deleteBookmarkMutate } = useTodayFortuneDeleteMutation();

  const isAuthenticated = useRecoilValue(authState);
  const userData = useRecoilValue(userState);

  const explainFortuneData = useRecoilValue(explainFortuneState);
  const fortuneZodiacData = useRecoilValue(fortuneZodiacState);
  const fortuneConstellationData = useRecoilValue(fortuneConstellationState);
  const isTodayFortuneSavedLocal = getLocalStorage('todayFortuneBookmark');

  const onSaveTodayFortune = () => {
    const getFortuneData = (key: string, recoilState: any) => recoilState || getLocalStorage(key);

    const explainFortune = getFortuneData('fortuneExplainData', explainFortuneData);
    const fortuneZodiac = getFortuneData('fortuneZodiac', fortuneZodiacData);
    const fortuneConstellation = getFortuneData('fortuneConstellation', fortuneConstellationData);

    if (!explainFortune || !fortuneZodiac || !fortuneConstellation) {
      return alert('데이터를 불러올 수 없습니다.');
    }

    if (!isAuthenticated?.isAuthenticated || !userData) {
      return alert('로그인이 필요합니다.');
    }

    const payload: todayFortuneSavePayloadType = {
      userId: userData.id,
      title: '오늘의 운세',
      todaysFortune: mapTodayFortuneData(explainFortune),
      zodiacFortune: mapZodiacFortuneData(fortuneZodiac, userData),
      starSignFortune: mapStarSignFortuneData(fortuneConstellation, userData),
    };

    if (isTodayFortuneSavedLocal?.isBookmark) {
      deleteBookmarkMutate({ payload: { userId: userData.id, sandbarId: isTodayFortuneSavedLocal.id } });
    } else {
      bookMarkMutate({ payload });
    }
  };

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
      <div className="w-full flex flex-col items-center py-4">
        <NavBar
          title="오늘의 운세"
          isResult={true}
          onBookmark={onSaveTodayFortune}
          isBookmark={isTodayFortuneSavedLocal}
        />

        <div
          role="tablist"
          className="w-full h-[50px] sm:h-[60px] tabs tabs-bordered flex justify-start mb-4 bg-white px-5"
        >
          {tabs.map((tab) => (
            <a
              key={tab.key}
              className={`w-full tab h-full px-0 sm:px-4 text-center text-clamp30 font-normal ${
                activeTab === tab.name ? 'tab-active !border-[#A47AF1]' : 'border-transparent'
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.name}
            </a>
          ))}
        </div>

        <div className="w-full p-2">{renderTabContent()}</div>
      </div>
    </>
  );
};

export default SajuResult;
