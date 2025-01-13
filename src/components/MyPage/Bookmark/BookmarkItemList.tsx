import { FC } from 'react';
import dayjs from 'dayjs';

interface BookmarkItem {
  id: number;
  title: string;
  created_at?: string;
  fortuneId?: number;
  zodiacId?: number;
  startId?: number;
}

interface BookmarkItemListProps {
  data: { item: BookmarkItem; fullData: any }[]; // 최소 데이터와 전체 데이터 쌍
  handleCardClick: (fullData: any) => void; // 전체 데이터를 전달
}

const BookmarkItemList: FC<BookmarkItemListProps> = ({ data, handleCardClick }) => {
  return (
    <div className="w-full px-4">
      {data.map(({ item, fullData }, index) => (
        <div
          key={index}
          onClick={() => handleCardClick(fullData)}
          className="w-full border rounded-[10px] border-[#787878] p-4 mb-4 
          cursor-pointer space-y-2 hover:shadow-md"
        >
          <h3 className="text-[16px] sm:text-[20px] font-bold text-start">{item.title}</h3>
          <div className="flex justify-between">
            <p className="text-[12px] sm:text-[20px] font-normal text-start text-[#787878]">{`${item.title} 결과보기`}</p>
            {item.created_at && (item.title === '오늘의 타로' || item.title === '오늘의 운세') && (
              <p className="text-[12px] sm:text-[20px] font-normal text-start text-[#787878]">
                {dayjs(item.created_at).format('YYYY-MM-DD')}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookmarkItemList;
