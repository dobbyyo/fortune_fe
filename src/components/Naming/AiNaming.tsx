import { useAiNamingMutation } from '@/services/queries/naming.query';
import { namingMainTitleTab } from '@/stores/useNamingStore';
import { ChangeEvent, useState } from 'react';
import { useRecoilState } from 'recoil';

const AiNaming = () => {
  const [mainTitle, setMainTitle] = useRecoilState(namingMainTitleTab);
  const [content, setContent] = useState('');

  const handleCategoryClick = (category: { id: number; label: string; icon: string }) => {
    setMainTitle(category.label);
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const namingCategories = [
    { id: 1, label: '사람', icon: '/naming/human-icon.svg' },
    { id: 2, label: '반려동물', icon: '/naming/cat-icon.svg' },
    { id: 3, label: '아이디어', icon: '/naming/innovation-icon.svg' },
    { id: 4, label: '제품명', icon: '/naming/shopping-icon.svg' },
    { id: 5, label: '상호명', icon: '/naming/shop-icon.svg' },
    { id: 6, label: '회사명', icon: '/naming/building-icon.svg' },
  ];

  const payload = {
    mainTitle,
    content,
  };
  const { mutate: aiNamingMutate } = useAiNamingMutation();

  const handleGenerate = () => {
    if (!mainTitle || !content) {
      alert('카테고리와 설명을 입력해주세요.');
      return;
    }

    aiNamingMutate({ payload });
  };

  return (
    <>
      <div className="w-full bg-[#F6F6F6] flex flex-col items-center py-8">
        <h1 className="text-[20px] sm:text-[30px] font-bold mt-5 text-center">원하는 이름을 만들어 드립니다.</h1>

        <div className="grid grid-cols-3 gap-5 sm:gap-10 px-4 mt-8 w-full max-w-[800px] place-items-center">
          {namingCategories.map((category) => {
            const isActive = mainTitle === category.label;

            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={`btn btn-ghost shadow-lg flex flex-col items-center justify-center
                  w-[80px] h-[80px] sm:w-[140px] sm:h-[110px]
                  ${isActive ? 'bg-[#eded]' : 'bg-white'} hover:bg-gray-200 rounded-lg`}
              >
                <img
                  src={category.icon}
                  alt={category.label}
                  className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] mb-2"
                />
                <span className="text-[12px] sm:text-[25px] font-medium">{category.label}</span>
              </button>
            );
          })}
        </div>

        <div className="w-full mt-8 px-4">
          <h3 className="text-[18px] sm:text-[25px] font-medium text-start mb-2">간단한 설명</h3>
          <input
            type="text"
            value={content}
            onChange={handleInputChange}
            placeholder="예시) 모던한 느낌의 사람 이름"
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg shadow-sm font-medium
              placeholder:text-[14px] sm:placeholder:text-[25px] text-[14px] sm:text-[18px] focus:outline-none
            "
          />
        </div>
      </div>

      <button
        onClick={handleGenerate}
        className="w-full sm:w-[240px] py-3 bg-[#A47aF1] text-white text-clamp25 font-bold sm:rounded-[30px] sm:mt-10"
      >
        생성하기
      </button>
    </>
  );
};

export default AiNaming;
