import { useRecoilState } from 'recoil';
import { tabState } from '@/stores/useTabStore';
import { selectedCardsState } from '@/stores/useTarotCardStore';

const TabNavigation = () => {
  const tabs = ['오늘의 타로', '이달의 타로', '연애 타로', '취업 타로'];
  const [selectedCards, setSelectedCards] = useRecoilState(selectedCardsState);
  const [activeTab, setActiveTab] = useRecoilState(tabState);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setSelectedCards(selectedCards.map(() => null));
  };

  return (
    <div role="tablist" className="flex w-full">
      {tabs.map((tab) => (
        <button
          key={tab}
          role="tab"
          onClick={() => handleTabClick(tab)}
          className={`w-full py-2 focus:outline-none text-[clamp(14px,2vw,25px)] font-normal
						border-t-0 border-l-0 border-r-0 rounded-none border-b-2 border-[#F2F2F2] bg-inherit ${
              activeTab === tab ? 'border-b-2  text-[#A47AF1] font-bold !border-[#A47AF1]' : ''
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
