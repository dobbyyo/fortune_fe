import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '../lib/queryClient';
import { HelmetProvider } from 'react-helmet-async';
import { CookiesProvider } from 'react-cookie';
import App from '@/App';

jest.mock('../config/config', () => ({
  config: {
    apiUrl: 'http://localhost:mock', // 테스트 환경의 Mock 데이터
  },
}));

jest.mock('@/provider/AppContent', () => ({
  __esModule: true,
  default: () => <div>Mocked AppContent</div>,
}));

// Mock Suspense
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  Suspense: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('App Component', () => {
  test('renders AppContent component', async () => {
    render(
      <HelmetProvider>
        <CookiesProvider>
          <RecoilRoot>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </RecoilRoot>
        </CookiesProvider>
      </HelmetProvider>,
    );

    // AppContent의 Mock된 텍스트가 렌더링되는지 확인
    await waitFor(() => expect(screen.getByText(/Mocked AppContent/i)).toBeInTheDocument());
  });
});
