import './App.css';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './lib/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import { CookiesProvider } from 'react-cookie';
import { Router } from './routes';

import 'swiper/css';
import 'swiper/css/pagination';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <CookiesProvider>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <Router />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </RecoilRoot>
      </CookiesProvider>
    </HelmetProvider>
  );
}

export default App;
