import { Line, NavBar } from '@/components/Common';
import { AiNaming, ProfessionalNaming } from '@/components/Naming';
import { MetaTag } from '@/components/Seo';
import { namingMetaData } from '@/config/metaData';
import { useState } from 'react';

const NamingHome = () => {
  const {
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
  } = namingMetaData.namingHome;

  const [activeTab, setActiveTab] = useState('AI 작명');
  const tabs = [
    { name: 'AI 작명', key: 'aiNaming' },
    { name: '전문가 의뢰', key: 'professionalNaming' },
  ];

  const renderTabContent = () => {
    const tabContentMap: { [key: string]: JSX.Element } = {
      aiNaming: <AiNaming />,
      professionalNaming: <ProfessionalNaming />,
    };

    const activeTabKey: string = tabs.find((tab) => tab.name === activeTab)?.key || 'aiNaming';
    return tabContentMap[activeTabKey] || <div>탭을 선택하세요</div>;
  };

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
        <NavBar title="작명" isResult={false} isBookmark={false} />

        <Line />

        <div
          role="tablist"
          className="w-full h-[50px] sm:h-[60px] tabs tabs-bordered flex justify-start mb-4 bg-white px-0 sm:px-5"
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

        <div className="w-full py-2">{renderTabContent()}</div>
      </div>
    </>
  );
};

export default NamingHome;
