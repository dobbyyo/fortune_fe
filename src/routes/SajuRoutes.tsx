import { lazy } from 'react';

const Saju = lazy(() => import('@/pages/Saju/Saju'));
const Today = lazy(() => import('@/pages/Saju/Today'));

const sajuRoutes = [
  {
    path: '/saju',
    element: <Saju />,
    isPrivate: true,
  },
  {
    path: '/saju/today',
    element: <Today />,
    isPrivate: true,
  },
];

export default sajuRoutes;
