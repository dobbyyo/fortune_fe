import { lazy } from 'react';

const SajuHome = lazy(() => import('@/pages/Saju/SajuHome'));
const SajuToday = lazy(() => import('@/pages/Saju/TodaySaju/SajuToday'));
const SajuResult = lazy(() => import('@/pages/Saju/TodaySaju/SajuResult'));

const SajuTomorrow = lazy(() => import('@/pages/Saju/TomorrowSaju/SajuTomorrow'));
const SajuSelect = lazy(() => import('@/pages/Saju/SelectSaju/SajuSelect'));
const SajuYear = lazy(() => import('@/pages/Saju/YearSaju/SajuYear'));
const SajuTojeong = lazy(() => import('@/pages/Saju/TojeongSaju/SajuTojeong'));
const SajuTraditional = lazy(() => import('@/pages/Saju/TraditionalSaju/SajuTraditional'));

const sajuRoutes = [
  {
    path: '/saju',
    element: <SajuHome />,
    isPrivate: true,
  },
  {
    path: '/saju/today',
    element: <SajuToday />,
    isPrivate: true,
  },
  {
    path: '/saju/result',
    element: <SajuResult />,
    isPrivate: true,
  },

  {
    path: '/saju/tomorrow',
    element: <SajuTomorrow />,
    isPrivate: true,
  },
  {
    path: '/saju/select',
    element: <SajuSelect />,
    isPrivate: true,
  },
  {
    path: '/saju/year',
    element: <SajuYear />,
    isPrivate: true,
  },
  {
    path: '/saju/tojeong',
    element: <SajuTojeong />,
    isPrivate: true,
  },
  {
    path: '/saju/traditional',
    element: <SajuTraditional />,
    isPrivate: true,
  },
];

export default sajuRoutes;
