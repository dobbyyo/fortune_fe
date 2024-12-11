import { CategoryButton } from '@/components/Home';
import { useCheckAuthQuery } from '@/services/queries/auth.query';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  useCheckAuthQuery();
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate(); // React Router 사용

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
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={handleSearch}
        className="px-2 flex items-center w-full h-[60px] sm:h-[70px] md:h-[84px] bg-white border border-[#404040] rounded-[5px]"
      >
        <div>
          <img
            src="/search-icon.jpg"
            alt="검색 아이콘"
            className="w-[30px] h-[40px] sm:w-[50px] sm:h-[60px] md:w-[60px] md:h-[70px] ml-2"
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

      <div className="mt-[50px] w-full">
        <h2 className="font-bold flex justify-start text-clamp50">전체 카테고리</h2>
        <div className="flex justify-center gap-4 mt-4">
          <CategoryButton icon="/mainTarot.svg" label="타로" pageUrl="tarot" />
          <CategoryButton icon="/mainSaju.svg" label="사주" pageUrl="saju" />
          <CategoryButton icon="/mainDream.svg" label="꿈해몽" pageUrl="dream" />
          <CategoryButton icon="/mainNaming.svg" label="작명" pageUrl="naming" />
        </div>
      </div>
    </div>
  );
};

export default Home;
