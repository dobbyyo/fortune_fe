import { useAiDreamBookmarkDeleteMutation, useAiDreamBookmarkMutation } from '@/services/queries/dream.query';
import { authState } from '@/stores/useAuthStore';
import { aiDreamMainTitleTab, aiDreamState, savedAiDreamState } from '@/stores/useDreamStore';
import { AiDreamData } from '@/types/dreamType';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

const DreamResult = () => {
  const navigate = useNavigate();

  const aiDreamData = useRecoilValue(aiDreamState);
  const [savedDreams, setSavedDreams] = useRecoilState(savedAiDreamState);
  const [localData, setLocalData] = useState(null);
  const isAuthenticated = useRecoilValue(authState);
  const mainTitle = useRecoilValue(aiDreamMainTitleTab);

  // 데이터 우선순위: Recoil -> 로컬스토리지
  const dreamData = aiDreamData || localData;

  const { mutate: bookmark } = useAiDreamBookmarkMutation();
  const { mutate: unBookmark } = useAiDreamBookmarkDeleteMutation();

  // 로컬스토리지에서 데이터 가져오기
  useEffect(() => {
    const savedDream = JSON.parse(localStorage.getItem('aiDream') || 'null');
    setLocalData(savedDream);
  }, []);
  const isBookmarked = (title: string) => {
    return savedDreams && savedDreams.title === title;
  };

  const handleBookmarkToggle = (dream: AiDreamData) => {
    if (!isAuthenticated.isAuthenticated) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }

    if (isBookmarked(dream.title)) {
      if (savedDreams && savedDreams.id) {
        unBookmark(
          { payload: { id: savedDreams.id } },
          {
            onSuccess: () => {
              setSavedDreams(null);
              localStorage.removeItem('savedDream');
            },
          },
        );
      }
    } else {
      bookmark(
        {
          payload: {
            mainTitle,
            user_description: dream.description,
            ai_interpretation: dream.interpretation,
          },
        },
        {
          onSuccess: (response) => {
            const { savedDreamInterpretation } = response.data;
            setSavedDreams(savedDreamInterpretation);
            localStorage.setItem('savedDream', JSON.stringify(savedDreamInterpretation));
          },
        },
      );
    }
  };

  // 뒤로가기 버튼 클릭 시
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="w-full h-full flex flex-col items-center mt-10">
      <div className="relative w-full flex items-center">
        <img
          src="/common/back-icon.jpg"
          alt="back-icon"
          className="absolute left-0 w-[50px] h-[50px]"
          onClick={handleBackClick}
        />
        <h1 className="pl-2 mx-auto font-bold text-clamp50">꿈해몽</h1>
      </div>

      <div className="w-full border-b border-[#e5e5e5] mt-[50px]"></div>

      <div className="w-full">
        <div className="space-y-4 px-2 w-full pt-10">
          {dreamData && (
            <>
              <div className="border rounded-lg p-4 flex items-center justify-between shadow-sm">
                <div className="mr-5">
                  <button className="w-[30px] h-[30px]" onClick={() => handleBookmarkToggle(dreamData)}>
                    <img
                      src={isBookmarked(dreamData.title) ? '/on-bookmark-icon.jpg' : '/off-bookmark-icon.jpg'}
                      alt="북마크"
                      className="w-full h-full object-contain"
                    />
                  </button>
                </div>
                <div className="w-full">
                  <h3 className="text-[20px] sm:text-[35px] font-bold text-center mb-5">{dreamData.title}</h3>
                  <p className="text-[15px] sm:text-[30px] font-normal text-start">{dreamData.description}</p>
                </div>
              </div>

              <div className="pt-10 text-start">
                <h2 className="text-[20px] sm:text-[30px] font-bold">해몽</h2>
                <p className="text-[15px] sm:text-[25px] font-normal mt-5">{dreamData.interpretation}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DreamResult;
