import { NavBar } from '@/components/Common';
import { StarSignFortune, TodayFortune, ZodiacFortune } from '@/components/Saju/SajuResult';
import { getLocalStorage } from '@/lib/localStorage';
import { useTodayFortuneDeleteMutation, useTodayFortuneSaveMutation } from '@/services/queries/saju.query';
import { authState, userState } from '@/stores/useAuthStore';
import { explainFortuneState, fortuneConstellationState, fortuneZodiacState } from '@/stores/useSajuStore';
import { todayFortuneSavePayloadType } from '@/types/fortuneType';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

const SajuResult = () => {
  const [activeTab, setActiveTab] = useState('오늘의 운세');

  const TABS = [
    { name: '오늘의 운세', key: 'today' },
    { name: '띠 운세', key: 'zodiac' },
    { name: '별자리 운세', key: 'stars' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case '오늘의 운세':
        return <TodayFortune />;
      case '띠 운세':
        return <ZodiacFortune />;
      case '별자리 운세':
        return <StarSignFortune />;
      default:
        return <div>탭을 선택하세요</div>;
    }
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
    const localExplainFortuneData = getLocalStorage('fortuneExplainData');
    const localFortuneZodiacData = getLocalStorage('fortuneZodiac');
    const localFortuneConstellationData = getLocalStorage('fortuneConstellationData');

    const explainFortune = explainFortuneData || localExplainFortuneData;
    const fortuneZodiac = fortuneZodiacData || localFortuneZodiacData;
    const fortuneConstellation = fortuneConstellationData || localFortuneConstellationData;

    if (!explainFortune || !fortuneZodiac || !fortuneConstellation) {
      alert('데이터를 불러올 수 없습니다.');
      return;
    }

    if (isAuthenticated.isAuthenticated === false || !userData) {
      alert('로그인이 필요합니다.');
      return;
    }

    const payload: todayFortuneSavePayloadType = {
      userId: userData.id,
      title: '오늘의 운세',
      todaysFortune: {
        totalFortuneTitle: '총운',
        totalFortuneDescription: explainFortune.explanationData.generalFortune,
        wealthFortuneTitle: '재물운',
        wealthFortuneDescription: explainFortune.explanationData.wealthFortune,
        loveFortuneTitle: '연애운',
        loveFortuneDescription: explainFortune.explanationData.loveFortune,
        businessFortuneTitle: '사업운',
        businessFortuneDescription: explainFortune.explanationData.careerFortune,
        healthFortuneTitle: '건강운',
        healthFortuneDescription: explainFortune.explanationData.healthFortune,
        studyFortuneTitle: '학업운',
        studyFortuneDescription: explainFortune.explanationData.studyFortune,
        luckyItemsTitle: '행운의 요소',
        luckyItem1: explainFortune.explanationData.luckyElements[0],
        luckyItem2: explainFortune.explanationData.luckyElements[1],
        luckyOutfitTitle: '행운의 코디',
        luckyOutfitDescription: explainFortune.explanationData.luckyOutfit,
      },
      zodiacFortune: {
        zodiacTitle: fortuneZodiac.zodiacFortune.name,
        zodiacMainDescription: fortuneZodiac.zodiacFortune.zodiacGeneral,
        zodiacSubDescription: fortuneZodiac.zodiacFortune.zodiacToday,
        yearOfBirth: userData.birth_date.split('-')[0], // 출생 연도 추출
        imageUrl: fortuneZodiac.zodiacFortune.image_url,
      },
      starSignFortune: {
        starSign: fortuneConstellation.constellation.name,
        starMainDescription: fortuneConstellation.constellation.constellationGeneral,
        starSubDescription: fortuneConstellation.constellation.constellationToday,
        imageUrl: fortuneConstellation.constellation.image_url,
        year: userData.birth_date.split('-')[0], // 출생 연도 추출
      },
    };

    if (isTodayFortuneSavedLocal && isTodayFortuneSavedLocal.isBookmark) {
      const payload = {
        userId: userData.id,
        sandbarId: isTodayFortuneSavedLocal.id,
      };
      deleteBookmarkMutate({ payload });
    } else {
      bookMarkMutate({ payload });
    }
  };

  return (
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
        {TABS.map((tab) => (
          <a
            key={tab.key}
            className={`w-full tab h-full px-4 text-center text-clamp30 font-normal ${
              activeTab === tab.name ? 'tab-active !border-[#A47AF1]' : 'border-transparent'
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}
          </a>
        ))}
      </div>

      <div className="w-full p-4">{renderTabContent()}</div>
    </div>
  );
};

export default SajuResult;
