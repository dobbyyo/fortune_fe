import { LoadingBar, NavBar } from '@/components/Common';
import { getLocalStorage } from '@/lib/localStorage';
import { useTodayFortuneExplainQuery } from '@/services/queries/saju.query';
import { userState } from '@/stores/useAuthStore';
import { loadingState } from '@/stores/useLoadingStore';
import { todayFortuneState } from '@/stores/useSajuStore';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const SajuResult = () => {
  const setIsLoading = useSetRecoilState(loadingState);
  const myData = useRecoilValue(userState);

  const userId = myData?.id;

  const {
    data: fortuneData,
    isLoading,
    isError,
  } = useTodayFortuneExplainQuery(userId, {
    enabled: userId !== undefined,
  });

  useEffect(() => {
    setIsLoading(isLoading);
    if (isError) setIsLoading(false);
  }, [isLoading, isError, setIsLoading]);

  if (!userId) {
    return <LoadingBar />;
  }

  return (
    <div className="flex flex-col items-center p-4 bg-[#f2f2f2]">
      <NavBar title="오늘의 운세" isResult={true} />
      {fortuneData && (
        <>
          {[
            { title: '총운', content: fortuneData.explanationData.generalFortune },
            { title: '재물운', content: fortuneData.explanationData.wealthFortune },
            { title: '연애운', content: fortuneData.explanationData.loveFortune },
            { title: '사업운', content: fortuneData.explanationData.careerFortune },
            { title: '건강운', content: fortuneData.explanationData.healthFortune },
            { title: '학업운', content: fortuneData.explanationData.studyFortune },
          ].map((item, index) => (
            <div key={index} className="w-full bg-[#e6e6fa] p-3 rounded-lg my-2 shadow-md">
              <h3 className="font-bold text-lg text-[#6a5acd]">🍀{item.title}</h3>
              <p className="text-sm text-gray-700 mt-1">{item.content}</p>
            </div>
          ))}

          {/* 행운의 요소 */}
          <div className="w-full bg-white p-3 rounded-lg my-4 shadow-md">
            <h3 className="font-bold text-lg text-[#6a5acd]">행운을 가져오는 것들</h3>
            <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
              {fortuneData.explanationData.luckyElements.map((element, index) => (
                <li key={index}>{element}</li>
              ))}
            </ul>
          </div>

          {/* 행운의 코디 */}
          <div className="w-full bg-white p-3 rounded-lg my-4 shadow-md">
            <h3 className="font-bold text-lg text-[#6a5acd]">행운의 코디</h3>
            <p className="text-sm text-gray-700 mt-2">{fortuneData.explanationData.luckyOutfit}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default SajuResult;
