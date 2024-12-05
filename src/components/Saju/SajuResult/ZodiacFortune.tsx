import { LoadingBar } from '@/components/Common';
import { getLocalStorage, setLocalStorage } from '@/lib/localStorage';
import { useZodiacFortuneQuery } from '@/services/queries/saju.query';
import { userIdSelector } from '@/stores/useAuthStore';
import { loadingState } from '@/stores/useLoadingStore';
import { fortuneZodiacState } from '@/stores/useSajuStore';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const ZodiacFortune = () => {
  const userId = useRecoilValue(userIdSelector);
  const setIsLoading = useSetRecoilState(loadingState);
  const localFortuneZodiacData = getLocalStorage('fortuneZodiacData');
  const [fortuneZodiac, setFortuneZodiac] = useRecoilState(fortuneZodiacState);

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
    if (data) {
      setLocalStorage('fortuneZodiacData', data);
      setFortuneZodiac(data);
    } else if (localFortuneZodiacData) {
      setFortuneZodiac(localFortuneZodiacData);
    }
  }, [data]);

  if (!userId) {
    return <LoadingBar />;
  }

  return (
    <div className="w-full">
      {fortuneZodiac && (
        <>
          <div className="flex flex-col items-center">
            <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center mb-4">
              <img
                src={fortuneZodiac.zodiacFortune.image_url}
                alt={fortuneZodiac.zodiacFortune.name}
                className="w-[100px] h-[100px]"
              />
            </div>

            {/* 이름과 정보 */}
            <h2 className="text-clamp35 font-bold">{fortuneZodiac.zodiacFortune.name}</h2>
            <p className="text-clamp30 font-normal mt-2">{fortuneZodiac.zodiacFortune.info}</p>

            {/* 연별 운세 */}
            <div className="w-full mt-4">
              {Object.entries(fortuneZodiac.zodiacFortune.yearlyFortunes).map(([year, fortune]) => (
                <div className="py-2 mt-5">
                  <div className="bg-[#DECEFF] h-[47px] flex justify-start items-center">
                    <h3 className="font-bold text-clamp35 text-start px-2">💜 {year}년생</h3>
                  </div>

                  <div className="flex justify-start items-center mt-2">
                    <p className="font-normal text-clamp30 text-start px-2">{fortune}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ZodiacFortune;
