import { ResponsiveImage } from '@/components/Common';
import { useNavigate } from 'react-router-dom';

const SajuCategory = () => {
  const navigate = useNavigate();
  const sajuCategories = [
    {
      id: 1,
      label: '오늘의 운세',
      pngIcon: '/saju/png/today.png',
      webpIcon: '/saju/webp/today.webp',
      url: '/saju/today',
    },
    {
      id: 2,
      label: '내일의 운세',
      pngIcon: '/saju/png/tomorrow.png',
      webpIcon: '/saju/webp/tomorrow.webp',
      url: '/saju/tomorrow',
    },
    {
      id: 3,
      label: '지정일 운세',
      pngIcon: '/saju/png/designated_day.png',
      webpIcon: '/saju/webp/designated_day.webp',
      url: '/saju/select',
    },
    {
      id: 4,
      label: '신년운세',
      pngIcon: '/saju/png/new_year.png',
      webpIcon: '/saju/webp/new_year.webp',
      url: '/saju/year',
    },
    {
      id: 5,
      label: '토정비결',
      pngIcon: '/saju/png/tojeong.png',
      webpIcon: '/saju/webp/tojeong.webp',
      url: '/saju/tojeong',
    },
    {
      id: 6,
      label: '정통사주',
      pngIcon: '/saju/png/orthodox.png',
      webpIcon: '/saju/webp/orthodox.webp',
      url: '/saju/traditional',
    },
  ];

  const onGoPage = (category: string) => {
    navigate(category);
  };

  return (
    <div className="grid grid-cols-3 gap-5 sm:gap-10 px-4 mt-8">
      {sajuCategories.map((category) => (
        <button
          key={category.id}
          onClick={() => onGoPage(category.url)}
          className="btn btn-ghost shadow-lg flex flex-col items-center  p-0
    justify-center w-[80px] h-[80px] sm:w-[140px] sm:h-[110px]
    bg-[#F6F6F6] hover:bg-gray-200 rounded-lg"
        >
          <div className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] mb-2">
            <ResponsiveImage
              webpSrc={category.webpIcon}
              pngSrc={category.pngIcon}
              alt={category.label}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[13px] md:text-[22px] font-normal">{category.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SajuCategory;
