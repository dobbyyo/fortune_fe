interface BookmarkTabProps {
  tabs: string[];
  handleTabClick: (tab: string) => void;
  activeTab: string;
}

const BookmarkTab = ({ tabs, handleTabClick, activeTab }: BookmarkTabProps) => {
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

export default BookmarkTab;
