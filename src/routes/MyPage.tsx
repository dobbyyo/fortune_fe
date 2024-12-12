import { lazy } from 'react';

const MyPage = lazy(() => import('@/pages/MyPage/MyPage'));
const Settings = lazy(() => import('@/pages/MyPage/Settings'));
const Account = lazy(() => import('@/pages/MyPage/Account'));
const Language = lazy(() => import('@/pages/MyPage/Language'));
const Notice = lazy(() => import('@/pages/MyPage/Notice'));
const Bookmark = lazy(() => import('@/pages/MyPage/Bookmark'));

const myRoutes = [
  {
    path: '/myPage',
    element: <MyPage />,
    isPrivate: true,
  },
  {
    path: '/myPage/settings',
    element: <Settings />,
    isPrivate: true,
  },
  {
    path: '/myPage/account',
    element: <Account />,
    isPrivate: true,
  },
  {
    path: '/myPage/language',
    element: <Language />,
    isPrivate: true,
  },
  {
    path: '/myPage/notice',
    element: <Notice />,
    isPrivate: true,
  },
  {
    path: '/myPage/bookmark',
    element: <Bookmark />,
    isPrivate: true,
  },
];

export default myRoutes;
