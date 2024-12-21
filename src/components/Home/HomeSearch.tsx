import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveImage } from '../Common';

const HomeSearch = () => {
  const navigate = useNavigate(); // React Router 사용
  const [searchTerm, setSearchTerm] = useState('');

  // 키워드 매핑 데이터
  const keywordMapping = {
    dream: ['해몽', '꿈'],
    saju: ['사주', '운세', '오늘의 운세', '내일의 운세', '지정일 운세', '신년운세', '토정비결', '정통사주'],
    naming: ['작명', '이름'],
    tarot: ['타로', '타로점', '타로운세', '타로카드', '별자리', '띠', '연애', '취업'],
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    for (const [category, keywords] of Object.entries(keywordMapping)) {
      if (keywords.some((keyword) => searchTerm.includes(keyword))) {
        navigate(`/${category}`);
        return;
      }
    }

    alert('해당 키워드와 매칭되는 카테고리가 없습니다.');
  };

  return (
    <form
      onSubmit={handleSearch}
      className="px-2 flex items-center w-full h-[60px] sm:h-[70px] md:h-[84px] bg-white border border-[#404040] rounded-[5px]"
    >
      <div>
        <ResponsiveImage
          webpSrc="/home/webp/search.webp"
          pngSrc="/home/png/search.png"
          alt="search"
          className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] md:w-[30px] md:h-[30px]"
        />
      </div>
      <input
        type="text"
        placeholder="검색할 내용을 입력해주세요."
        className="flex-1 p-2 text-gray-700 bg-transparent border-none 
    focus:outline-none text-clamp30 
    placeholder:text-clamp30 placeholder:font-normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
};

export default HomeSearch;
