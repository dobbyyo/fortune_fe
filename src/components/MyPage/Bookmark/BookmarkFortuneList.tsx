import { SavedTFortuneData } from '@/types/myPageType';

interface BookmarkFortuneListProps {
  explainsFortune: SavedTFortuneData;
}

const BookmarkFortuneList = ({ explainsFortune }: BookmarkFortuneListProps) => {
  return (
    <div className="w-full">
      {explainsFortune && (
        <>
          {[
            { title: '총운', content: explainsFortune.total_fortune_description },
            { title: '재물운', content: explainsFortune.wealth_fortune_description },
            { title: '연애운', content: explainsFortune.love_fortune_description },
            { title: '사업운', content: explainsFortune.business_fortune_description },
            { title: '건강운', content: explainsFortune.health_fortune_description },
            { title: '학업운', content: explainsFortune.study_fortune_description },
          ].map((item, index) => (
            <div className="py-2" key={item.title}>
              <div key={index} className="bg-[#DECEFF] h-[47px] flex justify-start items-center">
                <h3 className="font-bold text-[16px] sm:text-[20px] text-start px-2">🍀{item.title}</h3>
              </div>
              <div className="flex justify-start items-center mt-2">
                <p className="font-normal text-[14px] sm:text-[18px]  text-start px-2">{item.content}</p>
              </div>
            </div>
          ))}

          <div className="w-full h-2 border-b-2 border-dotted border-b-[#DECEFF] mx-auto"></div>

          {/* 행운의 요소 */}
          <div className="py-2 mt-5">
            <div className="bg-[#DECEFF] h-[47px] flex justify-start items-center">
              <h3 className="font-bold text-[16px] sm:text-[20px] text-start px-2">🍀행운을 가져오는 것들</h3>
            </div>
            <div className="flex justify-start items-center mt-2">
              <ul className="font-normal text-[14px] sm:text-[18px] text-start px-2">
                <li>♠ {explainsFortune.lucky_item_1}</li>
                <li>♠ {explainsFortune.lucky_item_2}</li>
              </ul>
            </div>
          </div>

          {/* 행운의 코디 */}
          <div className="py-2 mt-5">
            <div className="bg-[#DECEFF] h-[47px] flex justify-start items-center">
              <h3 className="font-bold  text-[16px] sm:text-[20px] text-start px-2">🍀행운을 가져오는 것들</h3>
            </div>
            <div className="flex justify-start items-center mt-2">
              <p className="font-normal text-[14px] sm:text-[18px] text-start px-2">
                {explainsFortune.lucky_outfit_description}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookmarkFortuneList;
