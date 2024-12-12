import { lazy } from 'react';

const Login = lazy(() => import('@/pages/Login'));
const Auth = lazy(() => import('@/pages/Auth'));
const Signup = lazy(() => import('@/pages/Signup'));

const TermsOfUse = lazy(() => import('@/pages/Agreement/TermsOfUse'));
const PersonalInformationTerms = lazy(() => import('@/pages/Agreement/PersonalInformationTerms'));
const MarketingUseAgreement = lazy(() => import('@/pages/Agreement/MarketingUseAgreement'));

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

  {
    path: '/termsOfUse',
    element: <TermsOfUse />,
    isPrivate: false,
  },
  {
    path: '/personalInformationTerms',
    element: <PersonalInformationTerms />,
    isPrivate: false,
  },
  {
    path: '/marketingUseAgreement',
    element: <MarketingUseAgreement />,
    isPrivate: false,
  },
];

export default authRoutes;
