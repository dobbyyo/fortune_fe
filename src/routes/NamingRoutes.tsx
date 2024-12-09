import { lazy } from 'react';

const NamingHome = lazy(() => import('@/pages/Naming/NamingHome'));
const NamingResult = lazy(() => import('@/pages/Naming/NamingResult'));

const dreamRoutes = [
  {
    path: '/naming',
    element: <NamingHome />,
    isPrivate: false,
  },
  {
    path: '/naming/result',
    element: <NamingResult />,
    isPrivate: false,
  },
];

export default dreamRoutes;
