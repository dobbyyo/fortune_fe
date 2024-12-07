import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '../lib/queryClient';
import { Router } from '@/routes';

jest.mock('../config/config', () => ({
  config: {
    apiUrl: 'http://localhost:mock', // 테스트 환경의 Mock 데이터
  },
}));

jest.mock('@/routes/Router', () => ({
  __esModule: true,
  default: () => (
    <div>
      <p>Welcome</p>
    </div>
  ),
}));

describe('App Component', () => {
  test('renders Router component', () => {
    render(
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </RecoilRoot>,
    );

    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });
});
