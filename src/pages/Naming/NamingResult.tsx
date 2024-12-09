import { aiNamingState } from '@/stores/useNamingStore';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const NamingResult = () => {
  // Recoil 상태 가져오기
  const aiNamingData = useRecoilValue(aiNamingState);
  const [localData, setLocalData] = useState(null);

  // 로컬스토리지에서 데이터 가져오기
  useEffect(() => {
    const savedNaming = JSON.parse(localStorage.getItem('aiNaming') || 'null');
    setLocalData(savedNaming);
  }, []);

  // 데이터 우선순위: Recoil -> 로컬스토리지
  const namingData = aiNamingData || localData;

  if (!namingData || !namingData.naming) {
    return <p>생성된 이름이 없습니다. 다시 시도해주세요.</p>;
  }

  return (
    <div className="w-full h-full flex flex-col items-center mt-10">
      <div className="flex justify-center items-center">
        <img src="/common/back-icon.jpg" alt="back-icon" className="w-[50px] h-[50px]" />
        <h1 className="text-center font-bold text-clamp50">AI 작명가</h1>
      </div>

      <div>
        <div className="text-center font-normal text-clamp30 my-5">
          <p>이름이 완성되었어요!</p>
          <p>마음에 드는 이름을 즐겨보세요.</p>
        </div>

        <div className="space-y-4 px-2">
          {namingData.naming.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 flex items-center justify-between shadow-sm">
              <div>
                <h3 className="text-[18px] sm:text-[22px] font-bold">{item.name}</h3>
                <p className="text-[14px] sm:text-[16px] text-gray-600">{item.description}</p>
              </div>
              <button className="w-[30px] h-[30px]">
                <img src="/icons/off-bookmark.svg" alt="북마크" className="w-full h-full object-contain" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NamingResult;
