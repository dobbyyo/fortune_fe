import { lazy } from 'react';

const Tarot = lazy(() => import('@/pages/Tarot/Tarot'));
const TarotCard = lazy(() => import('@/pages/Tarot/TarotCard'));
const TarotResult = lazy(() => import('@/pages/Tarot/TarotResult'));
const TarotShare = lazy(() => import('@/pages/Tarot/TarotShare'));

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
  {
    path: '/tarot/result/share/:id',
    element: <TarotShare />,
    isPrivate: false,
  },
];

export default tarotRoutes;
