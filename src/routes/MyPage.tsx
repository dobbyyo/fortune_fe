import { lazy } from 'react';

const MyPage = lazy(() => import('@/pages/MyPage/MyPage'));
const Settings = lazy(() => import('@/pages/MyPage/Settings'));
const Account = lazy(() => import('@/pages/MyPage/Account'));
const Language = lazy(() => import('@/pages/MyPage/Language'));
const Notice = lazy(() => import('@/pages/MyPage/Notice/Notice'));
const Bookmark = lazy(() => import('@/pages/MyPage/Bookmark/Bookmark'));
const BookmarkTarotCards = lazy(() => import('@/pages/MyPage/Bookmark/BookmarkTarotCards'));
const BookmarkFortuneCards = lazy(() => import('@/pages/MyPage/Bookmark/BookmarkFortuneCards'));
const BookmarkDreamCards = lazy(() => import('@/pages/MyPage/Bookmark/BookmarkDreamCards'));
const BookmarkNamingCards = lazy(() => import('@/pages/MyPage/Bookmark/BookmarkNamingCards'));

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
  {
    path: '/myPage/bookmarkTarotCards',
    element: <BookmarkTarotCards />,
    isPrivate: true,
  },
  {
    path: '/myPage/bookmarkFortuneCards',
    element: <BookmarkFortuneCards />,
    isPrivate: true,
  },
  {
    path: '/myPage/bookmarkDreamCards/:userId',
    element: <BookmarkDreamCards />,
    isPrivate: true,
  },
  {
    path: '/myPage/bookmarkNamingCards/:userId',
    element: <BookmarkNamingCards />,
    isPrivate: true,
  },
];

export default myRoutes;
