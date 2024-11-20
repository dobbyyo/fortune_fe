import { lazy } from 'react';

// Lazy Loading으로 페이지 컴포넌트 동적 로드
const Home = lazy(() => import('@/pages/Home'));
const Tarot = lazy(() => import('@/pages/Tarot'));
const MyPage = lazy(() => import('@/pages/MyPage'));

// 라우트 정보 객체화
const routes = [
	{
		path: '/',
		element: <Home />,
		isPrivate: false,
	},
	{
		path: '/tarot',
		element: <Tarot />,
		isPrivate: false,
	},
	{
		path: '/myPage',
		element: <MyPage />,
		isPrivate: true,
	},
];

export default routes;
