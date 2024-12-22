import { BackNavBar, Line, ResponsiveImage } from '@/components/Common';
import { MetaTag } from '@/components/Seo';
import { dreamMetaData } from '@/config/metaData';
import { useAiDreamBookmarkDeleteMutation, useAiDreamBookmarkMutation } from '@/services/queries/dream.query';
import { authState } from '@/stores/useAuthStore';
import { aiDreamMainTitleTab, aiDreamState, savedAiDreamState } from '@/stores/useDreamStore';
import { AiDreamData } from '@/types/dreamType';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const DreamResult = () => {
  const {
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
  } = dreamMetaData.dreamResult;

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

  return (
    <>
      <MetaTag
        title={metaTitle}
        description={metaDescription}
        keywords={keywords}
        canonical={canonical}
        ogTitle={ogTitle}
        ogDescription={ogDescription}
      />
      <div className="w-full h-full flex flex-col items-center mt-10">
        <BackNavBar title="꿈해몽" />

        <Line />

        <div className="w-full">
          <div className="space-y-4 px-2 w-full pt-10">
            {dreamData && (
              <>
                <div className="relative border rounded-lg p-4 flex items-center justify-between shadow-sm">
                  <div className="absolute left-2 top-6">
                    <button className="w-[30px] h-[30px]" onClick={() => handleBookmarkToggle(dreamData)}>
                      <ResponsiveImage
                        webpSrc={
                          isBookmarked(dreamData.title) ? '/dream/webp/bookmark_2.webp' : '/dream/webp/bookmark_1.webp'
                        }
                        pngSrc={
                          isBookmarked(dreamData.title) ? '/dream/png/bookmark_2.png' : '/dream/png/bookmark_1.png'
                        }
                        alt="북마크"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  </div>
                  <div className="w-full">
                    <h3 className="text-[20px] sm:text-[25px] font-bold text-center mb-5">{dreamData.title}</h3>
                    <p className="text-[15px] sm:text-[20px] font-normal text-start">{dreamData.description}</p>
                  </div>
                </div>

                <div className="pt-10 text-start">
                  <h2 className="text-[20px] sm:text-[25px] font-bold">해몽</h2>
                  <p className="text-[15px] sm:text-[20px] font-normal mt-5">{dreamData.interpretation}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DreamResult;
