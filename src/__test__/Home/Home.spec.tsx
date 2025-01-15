import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import Home from '@/pages/Home';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';

jest.mock('../../config/config', () => ({
  config: {
    apiUrl: 'http://localhost:mock', // 테스트 환경의 Mock 데이터
  },
}));

// 새로운 QueryClient 생성
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // 테스트에서 재시도 비활성화
        staleTime: Infinity, // 캐시를 항상 최신 상태로 유지
      },
    },
  });

// Mock 하위 컴포넌트
jest.mock('@/components/Home/HomeSearch', () => () => <div>Mocked HomeSearch</div>);
jest.mock('@/components/Home/CategoryWrapper', () => () => <div>Mocked CategoryWrapper</div>);

describe('Home Page', () => {
  test('renders HomeSearch and CategoryWrapper components', () => {
    const queryClient = createTestQueryClient();

    render(
      <HelmetProvider>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <Home />
          </QueryClientProvider>
        </RecoilRoot>
      </HelmetProvider>,
    );

    // Mock된 하위 컴포넌트가 렌더링되었는지 확인
    expect(screen.getByText('Mocked HomeSearch')).toBeInTheDocument();
    expect(screen.getByText('Mocked CategoryWrapper')).toBeInTheDocument();
  });
});
