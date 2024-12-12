import { SavedStarData } from '@/types/myPageType';

interface BookmarkStarListProps {
  explainsStar: SavedStarData;
}

const BookmarkStarList = ({ explainsStar }: BookmarkStarListProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center mb-4">
        <img src={explainsStar.image_url} alt={explainsStar.star_sign} className="w-[100px] h-[100px]" />
      </div>
      {/* 이름과 정보 */}
      <h2 className="text-clamp35 font-bold">{explainsStar.star_sign}</h2>

      <div className="w-full py-2 mt-5">
        <div className="bg-[#DECEFF] h-[47px] flex justify-start items-center">
          <h3 className="font-bold text-clamp35 text-start px-2">⭐ {explainsStar.star_sign}의 특징</h3>
        </div>
        <div className="flex justify-start items-center mt-2">
          <p className="font-normal text-clamp30 text-start px-2">{explainsStar.star_main_description}</p>
        </div>
      </div>

      <div className="w-full py-2 mt-5">
        <div className="bg-[#DECEFF] h-[47px] flex justify-start items-center">
          <h3 className="font-bold text-clamp35 text-start px-2">⭐ 오늘의 {explainsStar.star_sign} 자리</h3>
        </div>
        <div className="flex justify-start items-center mt-2">
          <p className="font-normal text-clamp30 text-start px-2">{explainsStar.star_sub_description}</p>
        </div>
      </div>
    </div>
  );
};

export default BookmarkStarList;
