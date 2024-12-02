import { NavBar } from '@/components/Common';
import { useNavigate } from 'react-router-dom';

const Saju = () => {
  const navigate = useNavigate();
  const sajuCategories = [
    { id: 1, label: '오늘의 운세', icon: '/saju/calendar-icon.svg', url: '/saju/today' },
    { id: 2, label: '내일의 운세', icon: '/saju/clock-icon.svg', url: '/saju/tomorrow' },
    { id: 3, label: '지정일 운세', icon: '/saju/circle-icon.svg', url: '/saju/date' },
    { id: 4, label: '신년운세', icon: '/saju/clover-icon.svg', url: '/saju/new-year' },
    { id: 5, label: '토정비결', icon: '/saju/fortune-icon.svg', url: '/saju/fortune' },
    { id: 6, label: '정통사주', icon: '/saju/note-icon.svg', url: '/saju/note' },
  ];

  const onGoPage = (category: string) => {
    navigate(`/saju/${category}`);
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <NavBar title="사주" isResult={false} />

      <div className="grid grid-cols-3 gap-5 sm:gap-10 px-4 mt-8">
        {sajuCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => onGoPage(category.url)}
            className="btn btn-ghost shadow-lg flex flex-col items-center  p-0
            justify-center w-[80px] h-[80px] sm:w-[140px] sm:h-[110px]
            bg-[#F6F6F6] hover:bg-gray-200 rounded-lg"
          >
            <img src={category.icon} alt={category.label} className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] mb-2" />
            <span className="text-[13px] md:text-[25px] font-normal">{category.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Saju;
