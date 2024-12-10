import { lazy } from 'react';

const DreamHome = lazy(() => import('@/pages/Dream/DreamHome'));
const DreamResult = lazy(() => import('@/pages/Dream/DreamResult'));

const dreamRoutes = [
  {
    path: '/dream',
    element: <DreamHome />,
    isPrivate: false,
  },
  {
    path: '/dream/result',
    element: <DreamResult />,
    isPrivate: false,
  },
];

export default dreamRoutes;
