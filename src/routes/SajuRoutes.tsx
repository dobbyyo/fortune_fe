import { lazy } from 'react';

const Saju = lazy(() => import('@/pages/Saju/Saju'));

const sajuRoutes = [
  {
    path: '/saju',
    element: <Saju />,
    isPrivate: true,
  },
];

export default sajuRoutes;
