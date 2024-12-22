import CategoryButton from './CategoryButton';

const CategoryWrapper = () => {
  return (
    <div className="mt-[50px] w-full">
      <h2 className="font-bold flex justify-start text-[18px] sm:text-[25px]">전체 카테고리</h2>
      <div className="flex justify-center gap-4 mt-4">
        <CategoryButton webpIcon="/home/webp/tarot.webp" pngIcon="home/png/tarot.png" label="타로" pageUrl="tarot" />
        <CategoryButton webpIcon="/home/webp/saju.webp" pngIcon="home/png/saju.png" label="사주" pageUrl="saju" />
        <CategoryButton
          webpIcon="/home/webp/dreaming.webp"
          pngIcon="home/png/dreaming.png"
          label="꿈해몽"
          pageUrl="dream"
        />
        <CategoryButton webpIcon="/home/webp/naming.webp" pngIcon="home/png/naming.png" label="작명" pageUrl="naming" />
      </div>
    </div>
  );
};

export default CategoryWrapper;
