import { lazy } from 'react';

const MyPage = lazy(() => import('@/pages/MyPage'));

const myRoutes = [
  {
    path: '/myPage',
    element: <MyPage />,
    isPrivate: true,
  },
];

export default myRoutes;
