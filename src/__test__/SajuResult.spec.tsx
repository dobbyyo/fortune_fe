import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { SajuResult } from '@/pages/Saju/TodaySaju';
import { authState, userState } from '@/stores/useAuthStore';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('../config/config', () => ({
  config: {
    apiUrl: 'http://localhost:mock',
    kakaoApiKey: 'mock-kakao-api-key',
    kakaoRedirectUri: 'http://localhost:mock-redirect',
  },
}));

jest.mock('@/lib/localStorage', () => ({
  setLocalStorage: jest.fn(),
  getLocalStorage: jest.fn(),
  removeLocalStorage: jest.fn(),
}));

jest.mock('recoil', () => ({
  ...jest.requireActual('recoil'),
  useRecoilValue: jest.fn((state) => {
    if (state === authState) {
      return { isAuthenticated: true };
    }
    if (state === userState) {
      return { id: 1, name: 'Test User', gender: 'MAN', birth_date: '1990-01-01' };
    }
    return undefined;
  }),
}));

// 공통 QueryClient 설정
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // 테스트 환경에서 불필요한 재시도 방지
      },
    },
  });

describe('SajuResult Component', () => {
  const testQueryClient = createTestQueryClient();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(React, 'useEffect').mockImplementationOnce(() => {});
  });

  test('renders NavBar and tabs correctly', () => {
    render(
      <QueryClientProvider client={testQueryClient}>
        <RecoilRoot>
          <MemoryRouter>
            <SajuResult />
          </MemoryRouter>
        </RecoilRoot>
      </QueryClientProvider>,
    );

    const elements = screen.queryAllByText('오늘의 운세');
    expect(elements).toHaveLength(2); // 두 개의 요소를 확인
    expect(elements[0]).toBeInTheDocument(); // NavBar의 제목
    expect(elements[1]).toBeInTheDocument(); // 탭
  });

  test('changes active tab when clicked', () => {
    render(
      <QueryClientProvider client={testQueryClient}>
        <RecoilRoot>
          <MemoryRouter>
            <SajuResult />
          </MemoryRouter>
        </RecoilRoot>
      </QueryClientProvider>,
    );

    const zodiacTab = screen.getByText('띠 운세');
    fireEvent.click(zodiacTab);

    expect(zodiacTab).toHaveClass('tab-active');
    expect(screen.getByText('띠 운세')).toBeInTheDocument();
  });
});
