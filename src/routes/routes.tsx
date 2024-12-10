import { lazy } from 'react';
import tarotRoutes from './TarotRoutes';
import sajuRoutes from './SajuRoutes';
import authRoutes from './AuthRoutes';
import myRoutes from './MyPage';
import namingRoutes from './NamingRoutes';
import dreamRoutes from './DreamRoutes';

const Home = lazy(() => import('@/pages/Home'));

const mainRoutes = [
  {
    path: '/',
    element: <Home />,
    isPrivate: false,
  },
];

// 통합 라우트
const routes = [
  ...mainRoutes,
  ...tarotRoutes,
  ...sajuRoutes,
  ...authRoutes,
  ...myRoutes,
  ...namingRoutes,
  ...dreamRoutes,
];

export default routes;
