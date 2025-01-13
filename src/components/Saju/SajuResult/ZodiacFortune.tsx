import { LoadingBar, ResponsiveImage } from '@/components/Common';
import { getLocalStorage, setLocalStorage } from '@/lib/localStorage';
import { useZodiacFortuneQuery } from '@/services/queries/saju.query';
import { userIdSelector, userState } from '@/stores/useAuthStore';
import { loadingState } from '@/stores/useLoadingStore';
import { fortuneZodiacState } from '@/stores/useSajuStore';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const ZodiacFortune = () => {
  const userId = useRecoilValue(userIdSelector);
  const setIsLoading = useSetRecoilState(loadingState);
  const localFortuneZodiacData = getLocalStorage('fortuneZodiacData');
  const [fortuneZodiac, setFortuneZodiac] = useRecoilState(fortuneZodiacState);
  const myData = useRecoilValue(userState);

  const { data, isLoading, isError } = useZodiacFortuneQuery(userId, {
    enabled: userId !== undefined && localFortuneZodiacData === null,
    staleTime: 60 * 60 * 1000,
    keepPreviousData: true,
  });

  useEffect(() => {
    setIsLoading(isLoading);
    if (isError) setIsLoading(false);
  }, [isLoading, isError, setIsLoading]);

  useEffect(() => {
    if (data && JSON.stringify(data) !== JSON.stringify(fortuneZodiac)) {
      setFortuneZodiac(data);
      setLocalStorage('fortuneZodiacData', data);
    } else if (
      !data &&
      localFortuneZodiacData &&
      JSON.stringify(localFortuneZodiacData) !== JSON.stringify(fortuneZodiac)
    ) {
      setFortuneZodiac(localFortuneZodiacData);
    }
  }, [data, localFortuneZodiacData, fortuneZodiac]);

  if ((!userId || !fortuneZodiac) && !localFortuneZodiacData) {
    return <LoadingBar />;
  }

  return (
    <div className="w-full">
      {fortuneZodiac && (
        <>
          <div className="flex flex-col items-center">
            <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center mb-4">
              <ResponsiveImage
                webpSrc={fortuneZodiac.zodiacFortune.image_url}
                pngSrc={fortuneZodiac.zodiacFortune.image_url}
                alt={fortuneZodiac.zodiacFortune.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 이름과 정보 */}
            <h2 className="text-[16px] sm:text-[20px] font-bold">{fortuneZodiac.zodiacFortune.name}</h2>
            <p className="text-[14px] sm:text-[18px] font-normal mt-2">{fortuneZodiac.zodiacFortune.info}</p>

            {/* 연별 운세 */}
            <div className="w-full mt-4">
              <div className="py-2 mt-5">
                <div className="bg-[#DECEFF] h-[47px] flex justify-start items-center">
                  <h3 className="font-bold text-[16px] sm:text-[20px] text-start px-2">
                    💜 {myData?.birth_date.split('-')[0]}년생
                  </h3>
                </div>

                <div className="flex justify-start items-center mt-2">
                  <p className="font-normal text-[14px] sm:text-[18px] text-start px-2">
                    {fortuneZodiac.zodiacFortune.zodiacYear}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ZodiacFortune;
