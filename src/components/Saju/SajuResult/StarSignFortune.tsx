import { LoadingBar, ResponsiveImage } from '@/components/Common';
import { getLocalStorage, setLocalStorage } from '@/lib/localStorage';
import { useConstellationFortuneQuery } from '@/services/queries/saju.query';
import { userIdSelector } from '@/stores/useAuthStore';
import { loadingState } from '@/stores/useLoadingStore';
import { fortuneConstellationState } from '@/stores/useSajuStore';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const StarSignFortune = () => {
  const userId = useRecoilValue(userIdSelector);
  const setIsLoading = useSetRecoilState(loadingState);
  const localFortuneConstellationData = getLocalStorage('fortuneConstellationData');
  const [fortuneConstellation, setFortuneConstellation] = useRecoilState(fortuneConstellationState);

  const { data, isLoading, isError } = useConstellationFortuneQuery(userId, {
    enabled: userId !== undefined && localFortuneConstellationData === null,
    staleTime: 60 * 60 * 1000,
    keepPreviousData: true,
  });

  useEffect(() => {
    setIsLoading(isLoading);
    if (isError) setIsLoading(false);
  }, [isLoading, isError, setIsLoading]);

  useEffect(() => {
    if (data && JSON.stringify(data) !== JSON.stringify(fortuneConstellation)) {
      setLocalStorage('fortuneConstellationData', data);
      setFortuneConstellation(data);
    } else if (
      !data &&
      localFortuneConstellationData &&
      JSON.stringify(localFortuneConstellationData) !== JSON.stringify(fortuneConstellation)
    ) {
      setFortuneConstellation(localFortuneConstellationData);
    }
  }, [data, localFortuneConstellationData, fortuneConstellation]);

  if (!userId || !fortuneConstellation) {
    return <LoadingBar />;
  }

  return (
    <div className="w-full">
      {fortuneConstellation && (
        <>
          <div className="flex flex-col items-center">
            <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center mb-4">
              <ResponsiveImage
                webpSrc={fortuneConstellation.constellation.image_url}
                pngSrc={fortuneConstellation.constellation.image_url}
                alt={fortuneConstellation.constellation.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* 이름과 정보 */}
            <h2 className="text-clamp35 font-bold">
              {fortuneConstellation.constellation.name} ({fortuneConstellation.constellation.start_date} ~
              {fortuneConstellation.constellation.end_date})
            </h2>

            <div className="w-full py-2 mt-5">
              <div className="bg-[#DECEFF] h-[47px] flex justify-start items-center">
                <h3 className="font-bold text-clamp30 text-start px-2">
                  ⭐ {fortuneConstellation.constellation.name}의 특징
                </h3>
              </div>
              <div className="flex justify-start items-center mt-2">
                <p className="font-normal text-clamp25 text-start px-2">
                  {fortuneConstellation.constellation.constellationGeneral}
                </p>
              </div>
            </div>

            <div className="w-full py-2 mt-5">
              <div className="bg-[#DECEFF] h-[47px] flex justify-start items-center">
                <h3 className="font-bold text-clamp30 text-start px-2">
                  ⭐ 오늘의 {fortuneConstellation.constellation.name} 자리
                </h3>
              </div>
              <div className="flex justify-start items-center mt-2">
                <p className="font-normal text-clamp25 text-start px-2">
                  {fortuneConstellation.constellation.constellationToday}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StarSignFortune;
