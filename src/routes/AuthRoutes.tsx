import { lazy } from 'react';

const Login = lazy(() => import('@/pages/Login'));
const Auth = lazy(() => import('@/pages/Auth'));
const Signup = lazy(() => import('@/pages/Signup'));

const authRoutes = [
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

export default authRoutes;
