import { lazy } from 'react';

const SajuHome = lazy(() => import('@/pages/Saju/SajuHome'));
const SajuToday = lazy(() => import('@/pages/Saju/SajuToday'));
const SajuResult = lazy(() => import('@/pages/Saju/SajuResult'));

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
];

export default sajuRoutes;
