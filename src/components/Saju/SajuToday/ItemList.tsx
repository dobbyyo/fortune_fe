import { useTodayFortuneQuery } from '@/services/queries/saju.query';
import { userState } from '@/stores/useAuthStore';
import { loadingState } from '@/stores/useLoadingStore';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import ListDisplay from './ListDisplay';
import ImageList from './ImageList';
import { todayFortuneState } from '@/stores/useSajuStore';

const ItemList = () => {
  const [todayFortune, setTodayFortune] = useRecoilState(todayFortuneState);
  const setIsLoading = useSetRecoilState(loadingState);
  const myData = useRecoilValue(userState);

  const userId = myData?.id;

  const {
    data: todayFortuneData,
    isLoading,
    isError,
  } = useTodayFortuneQuery(userId, {
    enabled: userId !== undefined,
  });

  useEffect(() => {
    setIsLoading(isLoading);
    if (isLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    if (!userId) {
      setIsLoading(false);
    }
    if (isError) setIsLoading(false);
  }, [isLoading, isError, setIsLoading]);

  useEffect(() => {
    if (todayFortuneData && todayFortuneData !== todayFortune) {
      setTodayFortune(todayFortuneData);
    }
  }, [todayFortuneData, todayFortune, setTodayFortune]);

  return (
    <div className="flex flex-col gap-4 text-center mt-[40px] w-full">
      {todayFortune && todayFortune.fortunesData && (
        <>
          <ListDisplay items={['사주', '일주', '월주', '년주']} className="bg-[#F2F2F2] py-1 rounded-[10px]" />
          <ListDisplay
            items={['편인', '일원', '겸재', '상관']}
            className="bg-[#F2F2F2] mt-[20px] py-1 rounded-[10px]"
          />
          <ImageList images={Object.values(todayFortune.fortunesData.heavenly.elements.img)} />
          <ImageList images={Object.values(todayFortune.fortunesData.earthly.elements.img)} />
          <ListDisplay
            items={Object.values(todayFortune.fortunesData.heavenlyStemTenGod)}
            className="bg-[#F2F2F2] mt-[20px] py-1 rounded-[10px]"
          />
          <ListDisplay
            items={Object.values(todayFortune.fortunesData.earthlyBranchTenGod)}
            className="bg-[#F2F2F2] mt-[20px] py-1 rounded-[10px]"
          />
          <ListDisplay
            items={Object.values(todayFortune.fortunesData.tenStemTwelveStates)}
            className="bg-[#F2F2F2] mt-[20px] py-1 rounded-[10px]"
          />
          <ListDisplay
            items={Object.values(todayFortune.fortunesData.twelveGod)}
            className="bg-[#F2F2F2] mt-[20px] py-1 rounded-[10px]"
          />
        </>
      )}
    </div>
  );
};

export default ItemList;
