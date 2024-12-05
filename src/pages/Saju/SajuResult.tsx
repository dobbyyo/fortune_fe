import { NavBar } from '@/components/Common';
import { StarSignFortune, TodayFortune, ZodiacFortune } from '@/components/Saju/SajuResult';
import { useState } from 'react';

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

  return (
    <div className="w-full flex flex-col items-center py-4">
      <NavBar title="오늘의 운세" isResult={true} />

      {/* 탭 헤더 */}
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
