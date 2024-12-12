import { Line, LoadingBar, NavBar } from '@/components/Common';
import { todayDate } from '@/hooks/dateHook';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/lib/localStorage';
import { useCheckAuthQuery } from '@/services/queries/auth.query';
import {
  explainFortuneState,
  fortuneConstellationState,
  fortuneZodiacState,
  todayFortuneState,
} from '@/stores/useSajuStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

const SajuHome = () => {
  const { data: checkLogin, isLoading: isCheckingLogin } = useCheckAuthQuery();
  const navigate = useNavigate();

  const sajuCategories = [
    { id: 1, label: '오늘의 운세', icon: '/saju/calendar-icon.svg', url: '/saju/today' },
    { id: 2, label: '내일의 운세', icon: '/saju/clock-icon.svg', url: '/saju/tomorrow' },
    { id: 3, label: '지정일 운세', icon: '/saju/circle-icon.svg', url: '/saju/select' },
    { id: 4, label: '신년운세', icon: '/saju/clover-icon.svg', url: '/saju/year' },
    { id: 5, label: '토정비결', icon: '/saju/fortune-icon.svg', url: '/saju/tojeong' },
    { id: 6, label: '정통사주', icon: '/saju/note-icon.svg', url: '/saju/traditional' },
  ];

  const onGoPage = (category: string) => {
    navigate(category);
  };

  const setTodayFortune = useSetRecoilState(todayFortuneState);
  const setExplainFortune = useSetRecoilState(explainFortuneState);
  const setFortuneZodiac = useSetRecoilState(fortuneZodiacState);
  const setFortuneConstellation = useSetRecoilState(fortuneConstellationState);

  useEffect(() => {
    const today = todayDate();
    const localDate = getLocalStorage('todayDate')?.todayDate;

    if (!localDate || localDate !== today) {
      // 날짜가 다르면 Recoil 상태 및 로컬스토리지 초기화
      setTodayFortune(null);
      setExplainFortune(null);
      setFortuneZodiac(null);
      setFortuneConstellation(null);

      removeLocalStorage('fortuneExplainData');
      removeLocalStorage('fortuneZodiacData');
      removeLocalStorage('fortuneConstellationData');
      removeLocalStorage('todayFortuneBookmark');
      setLocalStorage('todayDate', { todayDate: today });
    }
  }, [setTodayFortune, setExplainFortune, setFortuneZodiac, setFortuneConstellation]);

  useEffect(() => {
    if (checkLogin && checkLogin.status !== 200) {
      navigate('/login');
    }
  }, [checkLogin, isCheckingLogin]);

  if (isCheckingLogin || !checkLogin) {
    return <LoadingBar />;
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <NavBar title="사주" isResult={false} isBookmark={false} />
      <Line />

      <div className="grid grid-cols-3 gap-5 sm:gap-10 px-4 mt-8">
        {sajuCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => onGoPage(category.url)}
            className="btn btn-ghost shadow-lg flex flex-col items-center  p-0
            justify-center w-[80px] h-[80px] sm:w-[140px] sm:h-[110px]
            bg-[#F6F6F6] hover:bg-gray-200 rounded-lg"
          >
            <img src={category.icon} alt={category.label} className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] mb-2" />
            <span className="text-[13px] md:text-[25px] font-normal">{category.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SajuHome;
