import { aiDreamMainTitleTab } from '@/stores/useDreamStore';
import { useRecoilState } from 'recoil';
import { ResponsiveImage } from '../Common';

const DreamCategory = () => {
  const namingCategories = [
    { id: 1, label: '사람/행동', pngIcon: '/dream/png/person.png', webpIcon: '/dream/webp/person.webp' },
    { id: 2, label: '죽음/영혼', pngIcon: '/dream/png/death.png', webpIcon: '/dream/webp/death.webp' },
    { id: 3, label: '동물/곤충', pngIcon: '/dream/png/animal.png', webpIcon: '/dream/webp/animals.webp' },
    { id: 4, label: '식품/과일', pngIcon: '/dream/png/plants.png', webpIcon: '/dream/webp/plants.webp' },
    { id: 5, label: '자연현상', pngIcon: '/dream/png/natural.png', webpIcon: '/dream/webp/natural.webp' },
    { id: 6, label: '생활용품', pngIcon: '/dream/png/daily.png', webpIcon: '/dream/webp/daily.webp' },
    { id: 7, label: '태몽', pngIcon: '/dream/png/birth.png', webpIcon: '/dream/webp/birth.webp' },
  ];
  const [title, setTitle] = useRecoilState(aiDreamMainTitleTab);

  const handleCategoryClick = (category: { id: number; label: string; pngIcon: string; webpIcon: string }) => {
    setTitle(category.label);
  };

  return (
    <div className="grid grid-cols-3 gap-5 sm:gap-10 px-4 mt-8 w-full max-w-[800px] place-items-center">
      {namingCategories.map((category) => {
        const isActive = title === category.label;

        return (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className={`btn btn-ghost shadow-lg flex flex-col items-center justify-center
        w-[80px] h-[80px] sm:w-[140px] sm:h-[110px]
        ${isActive ? 'bg-[#eded]' : 'bg-white'} hover:bg-gray-200 rounded-lg`}
          >
            <div className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] mb-2">
              <ResponsiveImage
                webpSrc={category.webpIcon}
                pngSrc={category.pngIcon}
                alt={category.label}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[10px] sm:text-[18px] font-medium">{category.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default DreamCategory;
