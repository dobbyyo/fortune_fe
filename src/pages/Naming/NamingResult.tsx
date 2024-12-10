import { useAiNamingBookmarkMutation, useAiNamingUnBookmarkMutation } from '@/services/queries/naming.query';
import { aiNamingState, mainTitleTab, savedAiNamingState } from '@/stores/useNamingStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

const NamingResult = () => {
  const navigate = useNavigate();

  // Recoil 상태 가져오기
  const aiNamingData = useRecoilValue(aiNamingState);
  const [savedNamings, setSavedNamings] = useRecoilState(savedAiNamingState);
  const mainTitle = useRecoilValue(mainTitleTab);
  const [localData, setLocalData] = useState(null);

  // 로컬스토리지에서 데이터 가져오기
  useEffect(() => {
    const savedNaming = JSON.parse(localStorage.getItem('aiNaming') || 'null');
    setLocalData(savedNaming);
  }, []);

  // 데이터 우선순위: Recoil -> 로컬스토리지
  const namingData = aiNamingData || localData;
  const { mutate: bookmark } = useAiNamingBookmarkMutation();
  const { mutate: unBookmark } = useAiNamingUnBookmarkMutation();

  // 북마크 상태 확인 함수
  const isBookmarked = (name: string) => {
    return savedNamings.some((saved) => saved.name === name);
  };

  // 북마크 토글 함수
  const handleBookmarkToggle = (item: any) => {
    const isCurrentlyBookmarked = isBookmarked(item.name);

    if (isCurrentlyBookmarked) {
      const target = savedNamings.find((saved) => saved.name === item.name);
      if (target?.id) {
        unBookmark(
          { payload: { id: target.id } },
          {
            onSuccess: () => {
              // 로컬스토리지 업데이트
              const updatedNamings = savedNamings.filter((saved) => saved.name !== item.name);
              localStorage.setItem('savedNamings', JSON.stringify(updatedNamings));

              // Recoil 상태 업데이트
              setSavedNamings(updatedNamings);
            },
          },
        );
      }
    } else {
      bookmark(
        { payload: { mainTitle, namings: [{ name: item.name, description: item.description }] } }, // Description은 예시
        {
          onSuccess: (response) => {
            const { savedNamings: newSavedNamings } = response.data;

            // 로컬스토리지 업데이트
            const updatedNamings = [...savedNamings, ...newSavedNamings];
            localStorage.setItem('savedNamings', JSON.stringify(updatedNamings));

            // Recoil 상태 업데이트
            setSavedNamings(updatedNamings);
          },
        },
      );
    }
  };

  // 뒤로가기 버튼 클릭 시
  const handleBackClick = () => {
    navigate(-1);
  };

  if (!namingData || !namingData.naming) {
    return <p>생성된 이름이 없습니다. 다시 시도해주세요.</p>;
  }

  return (
    <div className="w-full h-full flex flex-col items-center mt-10">
      <div className="relative w-full flex items-center">
        <img
          src="/common/back-icon.jpg"
          alt="back-icon"
          className="absolute left-0 w-[50px] h-[50px]"
          onClick={handleBackClick}
        />
        <h1 className="pl-2 mx-auto font-bold text-clamp50">AI 작명가</h1>
      </div>

      <div>
        <div className="text-center font-normal text-clamp30 my-5">
          <p>이름이 완성되었어요!</p>
          <p>마음에 드는 이름을 즐겨보세요.</p>
        </div>

        <div className="space-y-4 px-2">
          {namingData.naming.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 flex items-center justify-between shadow-sm">
              <div className="mr-5">
                <button className="w-[30px] h-[30px]" onClick={() => handleBookmarkToggle(item)}>
                  <img
                    src={isBookmarked(item.name) ? '/on-bookmark-icon.jpg' : '/off-bookmark-icon.jpg'}
                    alt="북마크"
                    className="w-full h-full object-contain"
                  />
                </button>
              </div>
              <div>
                <h3 className="text-[20px] sm:text-[35px] font-bold text-center mb-5">{item.name}</h3>
                <p className="text-[15px] sm:text-[30px] font-normal text-start">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NamingResult;
