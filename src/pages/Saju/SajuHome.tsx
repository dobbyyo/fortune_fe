import { Line, LoadingBar, NavBar, ResponsiveImage } from '@/components/Common';
import { SajuCategory } from '@/components/Saju/Saju';
import { MetaTag } from '@/components/Seo';
import { sajuMetaData } from '@/config/metaData';
import { todayDate } from '@/hooks/dateHook';
import useRequireAuth from '@/hooks/useRequireAuth';
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
  const {
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
  } = sajuMetaData.sajuHome;

  const { data: checkLogin, isLoading: isCheckingLogin } = useCheckAuthQuery();
  const navigate = useNavigate();
  const { isLoading } = useRequireAuth();

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

  if (isCheckingLogin || !checkLogin || isLoading) {
    return <LoadingBar />;
  }

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
      <div className="w-full h-full flex flex-col items-center">
        <NavBar title="사주" isResult={false} isBookmark={false} />
        <Line />

        <SajuCategory />
      </div>
    </>
  );
};

export default SajuHome;
