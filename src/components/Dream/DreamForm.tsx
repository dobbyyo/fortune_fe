import { useAiDreamMutation } from '@/services/queries/dream.query';
import { aiDreamMainTitleTab } from '@/stores/useDreamStore';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';

const DreamForm = () => {
  const title = useRecoilValue(aiDreamMainTitleTab);
  const [description, setDescription] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const payload = {
    title,
    description,
  };

  const { mutate: aiDreamMutate } = useAiDreamMutation();
  const handleGenerate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !description) {
      alert('카테고리와 설명을 입력해주세요.');
      return;
    }
    aiDreamMutate({ payload });
  };

  return (
    <form className="w-full max-w-[800px] flex flex-col items-center" onSubmit={handleGenerate}>
      <div className="w-full mt-8 px-6">
        <h3 className="text-[18px] sm:text-[20px] font-medium text-start mb-2">간단한 설명</h3>
        <input
          type="text"
          value={description}
          onChange={handleInputChange}
          placeholder="예시) 모던한 느낌의 사람 이름"
          className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg shadow-sm font-medium
              placeholder:text-[14px] sm:placeholder:text-[20px] text-[14px] sm:text-[18px] focus:outline-none
            "
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-[240px] py-3 bg-[#A47aF1] text-white 
            text-[16px] sm:text-[20px] font-bold sm:rounded-[30px] mt-5"
      >
        생성하기
      </button>
    </form>
  );
};

export default DreamForm;
