import { lazy } from 'react';

const Tarot = lazy(() => import('@/pages/Tarot/Tarot'));
const TarotCard = lazy(() => import('@/pages/Tarot/TarotCard'));
const TarotResult = lazy(() => import('@/pages/Tarot/TarotResult'));

const tarotRoutes = [
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
];

export default tarotRoutes;
