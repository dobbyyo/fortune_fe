interface BookmarkFortuneTabProps {
  tabs: { name: string; key: string }[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BookmarkFortuneTab = ({ tabs, activeTab, setActiveTab }: BookmarkFortuneTabProps) => {
  return (
    <div role="tablist" className="w-full h-[50px] sm:h-[60px] tabs tabs-bordered flex justify-start mb-4 bg-white">
      {tabs.map((tab) => (
        <a
          key={tab.key}
          className={`w-full tab h-full px-0 sm:px-4 text-center text-[14px] sm:text-[20px] font-normal ${
            activeTab === tab.name ? 'tab-active !border-[#A47AF1]' : 'border-transparent'
          }`}
          onClick={() => setActiveTab(tab.name)}
        >
          {tab.name}
        </a>
      ))}
    </div>
  );
};

export default BookmarkFortuneTab;
