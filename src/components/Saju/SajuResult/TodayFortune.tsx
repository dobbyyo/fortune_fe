import { LoadingBar } from '@/components/Common';
import { todayDate } from '@/hooks/dateHook';
import { getLocalStorage, setLocalStorage } from '@/lib/localStorage';
import { useTodayFortuneExplainQuery } from '@/services/queries/saju.query';
import { userIdSelector } from '@/stores/useAuthStore';
import { loadingState } from '@/stores/useLoadingStore';
import { explainFortuneState } from '@/stores/useSajuStore';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const TodayFortune = () => {
  const userId = useRecoilValue(userIdSelector);
  const setIsLoading = useSetRecoilState(loadingState);
  const localFortuneData = getLocalStorage('fortuneExplainData');
  const [explainsFortune, setExplainsFortune] = useRecoilState(explainFortuneState);
  const today = todayDate();

  const { data, isLoading, isError } = useTodayFortuneExplainQuery(userId, {
    enabled: userId !== undefined && localFortuneData === null,
    staleTime: 60 * 60 * 1000,
    keepPreviousData: true,
  });

  useEffect(() => {
    setIsLoading(isLoading);
    if (isError) setIsLoading(false);
  }, [isLoading, isError, setIsLoading]);

  useEffect(() => {
    if (data) {
      setLocalStorage('fortuneExplainData', data);
      setLocalStorage('todayDate', today);
      setExplainsFortune(data);
    } else if (localFortuneData) {
      setExplainsFortune(localFortuneData);
    }
  }, [data]);

  if (!userId) {
    return <LoadingBar />;
  }

  return (
    <div className="w-full">
      {explainsFortune && (
        <>
          {[
            { title: '총운', content: explainsFortune.explanationData.generalFortune },
            { title: '재물운', content: explainsFortune.explanationData.wealthFortune },
            { title: '연애운', content: explainsFortune.explanationData.loveFortune },
            { title: '사업운', content: explainsFortune.explanationData.careerFortune },
            { title: '건강운', content: explainsFortune.explanationData.healthFortune },
            { title: '학업운', content: explainsFortune.explanationData.studyFortune },
          ].map((item, index) => (
            <div className="py-2" key={item.title}>
              <div key={index} className="bg-[#DECEFF] h-[47px] flex justify-start items-center">
                <h3 className="font-bold text-clamp35 text-start px-2">🍀{item.title}</h3>
              </div>
              <div className="flex justify-start items-center mt-2">
                <p className="font-normal text-clamp30 text-start px-2">{item.content}</p>
              </div>
            </div>
          ))}

          <div className="w-full h-2 border-b-2 border-dotted border-b-[#DECEFF] mx-auto"></div>

          {/* 행운의 요소 */}
          <div className="py-2 mt-5">
            <div className="bg-[#DECEFF] h-[47px] flex justify-start items-center">
              <h3 className="font-bold text-clamp35 text-start px-2">🍀행운을 가져오는 것들</h3>
            </div>
            <div className="flex justify-start items-center mt-2">
              <p className="font-normal text-clamp30 text-start px-2">
                {explainsFortune.explanationData.luckyElements.map((element, index) => (
                  <li key={index}>{element}</li>
                ))}
              </p>
            </div>
          </div>

          {/* 행운의 코디 */}
          <div className="py-2 mt-5">
            <div className="bg-[#DECEFF] h-[47px] flex justify-start items-center">
              <h3 className="font-bold text-clamp35 text-start px-2">🍀행운을 가져오는 것들</h3>
            </div>
            <div className="flex justify-start items-center mt-2">
              <p className="font-normal text-clamp30 text-start px-2">{explainsFortune.explanationData.luckyOutfit}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TodayFortune;
