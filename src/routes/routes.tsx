import Auth from '@/pages/Auth';
import Signup from '@/pages/Signup';
import { lazy } from 'react';

// Lazy Loading으로 페이지 컴포넌트 동적 로드
const Home = lazy(() => import('@/pages/Home'));
const Tarot = lazy(() => import('@/pages/Tarot/Tarot'));
const TarotCard = lazy(() => import('@/pages/Tarot/TarotCard'));
const TarotResult = lazy(() => import('@/pages/Tarot/TarotResult'));
const MyPage = lazy(() => import('@/pages/MyPage'));
const Login = lazy(() => import('@/pages/Login'));
const Saju = lazy(() => import('@/pages/Saju/Saju'));

// 라우트 정보 객체화
const routes = [
  // HOME
  {
    path: '/',
    element: <Home />,
    isPrivate: false,
  },

  // TAROT
  {
    path: '/tarot',
    element: <Tarot />,
    isPrivate: false,
  },
  {
    path: '/tarot/card',
    element: <TarotCard />,
    isPrivate: false,
  },
  {
    path: '/tarot/result',
    element: <TarotResult />,
    isPrivate: false,
  },

  // Saju
  {
    path: '/saju',
    element: <Saju />,
    isPrivate: true,
  },

  {
    path: '/myPage',
    element: <MyPage />,
    isPrivate: true,
  },
  {
    path: '/login',
    element: <Login />,
    isPrivate: false,
  },
  {
    path: '/auth',
    element: <Auth />,
    isPrivate: false,
  },
  {
    path: '/signup',
    element: <Signup />,
    isPrivate: false,
  },
];

export default routes;
