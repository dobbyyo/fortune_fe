import { SavedZodiacData } from '@/types/myPageType';

interface BookmarkZodiacListProps {
  explainsZodiac: SavedZodiacData;
}

const BookmarkZodiacList = ({ explainsZodiac }: BookmarkZodiacListProps) => {
  return (
    <div className="w-full flex flex-col items-center">
      {explainsZodiac && (
        <>
          <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center mb-4">
            <img src={explainsZodiac.image_url} alt={explainsZodiac.zodiac_title} className="w-[100px] h-[100px]" />
          </div>

          {/* 이름과 정보 */}
          <h2 className="text-clamp35 font-bold">{explainsZodiac.zodiac_title}</h2>
          <p className="text-clamp30 font-normal mt-2">{explainsZodiac.zodiac_main_description}</p>

          {/* 연별 운세 */}
          <div className="w-full mt-4">
            <div className="py-2 mt-5">
              <div className="w-full bg-[#DECEFF] h-[47px] flex justify-start items-center">
                <h3 className="font-bold text-clamp35 text-start px-2">💜 {explainsZodiac.year_of_birth}년생</h3>
              </div>

              <div className="flex justify-start items-center mt-2">
                <p className="font-normal text-clamp30 text-start px-2">{explainsZodiac.zodiac_sub_description}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookmarkZodiacList;
