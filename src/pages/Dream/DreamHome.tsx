import { Line, NavBar } from '@/components/Common';
import { useAiDreamMutation } from '@/services/queries/dream.query';
import { aiDreamMainTitleTab } from '@/stores/useDreamStore';
import { ChangeEvent, useState } from 'react';
import { useRecoilState } from 'recoil';

const DreamHome = () => {
  const [title, setTitle] = useRecoilState(aiDreamMainTitleTab);
  const [description, setDescription] = useState('');

  const handleCategoryClick = (category: { id: number; label: string; icon: string }) => {
    setTitle(category.label);
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const namingCategories = [
    { id: 1, label: '사람/행동', icon: '/dream/human-icon.svg' },
    { id: 2, label: '죽음/영혼', icon: '/dream/ghost-icon.svg' },
    { id: 3, label: '동물/곤충', icon: '/dream/animal-icon.svg' },
    { id: 4, label: '식품/과일', icon: '/dream/clover-icon.svg' },
    { id: 5, label: '자연현상', icon: '/dream/hurricane-icon.svg' },
    { id: 6, label: '생활용품', icon: '/dream/note-icon.svg' },
    { id: 7, label: '태몽', icon: '/dream/baby-icon.svg' },
  ];

  const payload = {
    title,
    description,
  };

  const { mutate: aiDreamMutate } = useAiDreamMutation();
  const handleGenerate = () => {
    if (!title || !description) {
      alert('카테고리와 설명을 입력해주세요.');
      return;
    }
    aiDreamMutate({ payload });
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <NavBar title="꿈해몽" isResult={false} isBookmark={false} />

      <Line />

      <div className="w-full bg-[#F6F6F6] flex flex-col items-center py-8 my-12">
        <h1 className="text-[20px] sm:text-[30px] font-bold mt-5 text-center">원하는 이름을 만들어 드립니다.</h1>

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

        <div className="w-full mt-8 px-6">
          <h3 className="text-[18px] sm:text-[25px] font-medium text-start mb-2">간단한 설명</h3>
          <input
            type="text"
            value={description}
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
        className="w-full sm:w-[240px] py-3 bg-[#A47aF1] text-white text-clamp25 font-bold sm:rounded-[30px]"
      >
        생성하기
      </button>
    </div>
  );
};

export default DreamHome;
