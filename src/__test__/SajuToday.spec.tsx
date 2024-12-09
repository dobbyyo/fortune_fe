import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { HeaderInfo, ItemList } from '@/components/Saju/SajuToday';
import { MemoryRouter } from 'react-router-dom';
import { todayFortuneState } from '@/stores/useSajuStore';
import { authState, userState } from '@/stores/useAuthStore';
import { loadingState } from '@/stores/useLoadingStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SajuToday } from '@/pages/Saju/TodaySaju';
import { NavBar } from '@/components/Common';

// 공통 Mock 데이터 설정
const mockSetIsLoading = jest.fn();
const mockSetTodayFortune = jest.fn();

jest.mock('../config/config', () => ({
  config: {
    apiUrl: 'http://localhost:mock', // Mock API URL
    kakaoApiKey: 'mock-kakao-api-key', // Mock Kakao API Key
    kakaoRedirectUri: 'http://localhost:mock-redirect', // Mock Redirect URI
  },
}));

jest.mock('recoil', () => ({
  ...jest.requireActual('recoil'),
  useRecoilValue: jest.fn((state) => {
    if (state === authState) {
      return { isAuthenticated: true }; // Mock isAuthenticated 상태
    }
    if (state === userState) {
      return { id: 1, name: 'Test User', gender: 'MAN', birth_date: '1990-01-01' }; // Mock userState 데이터
    }
    return undefined;
  }),
  useSetRecoilState: jest.fn((state) => {
    if (state === loadingState) return mockSetIsLoading;
    if (state === todayFortuneState) return mockSetTodayFortune;
    return jest.fn();
  }),
  useRecoilState: jest.fn((state) => {
    if (state === todayFortuneState) {
      return [
        {
          fortunesData: {
            heavenly: { elements: { img: { one: '/path1.jpg', two: '/path2.jpg' } } },
            earthly: { elements: { img: { three: '/path3.jpg', four: '/path4.jpg' } } },
            heavenlyStemTenGod: ['편인', '정인'],
            earthlyBranchTenGod: ['상관', '겁재'],
            tenStemTwelveStates: ['태', '생'],
            twelveGod: ['정관', '비견'],
          },
        },
        mockSetTodayFortune,
      ];
    }
    return [undefined, jest.fn()];
  }),
}));

jest.mock('@/services/queries/saju.query', () => ({
  useTodayFortuneQuery: jest.fn(() => ({
    data: {
      fortunesData: {
        heavenly: { elements: { img: { one: '/path1.jpg', two: '/path2.jpg' } } },
        earthly: { elements: { img: { three: '/path3.jpg', four: '/path4.jpg' } } },
        heavenlyStemTenGod: ['편인', '정인'],
        earthlyBranchTenGod: ['상관', '겁재'],
        tenStemTwelveStates: ['태', '생'],
        twelveGod: ['정관', '비견'],
      },
    },
    isLoading: false,
    isError: false,
  })),
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

// SajuToday Page
describe('SajuToday Component', () => {
  const testQueryClient = createTestQueryClient();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all child components', () => {
    render(
      <QueryClientProvider client={testQueryClient}>
        <RecoilRoot>
          <MemoryRouter>
            <SajuToday />
          </MemoryRouter>
        </RecoilRoot>
      </QueryClientProvider>,
    );

    expect(screen.getByText('오늘의 사주')).toBeInTheDocument(); // NavBar
    expect(screen.getByText('결과보기')).toBeInTheDocument(); // ResultButton
  });
});

// NavBar
describe('NavBar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders title correctly', () => {
    render(
      <RecoilRoot>
        <MemoryRouter>
          <NavBar title="테스트 제목" isResult={false} isBookmark={false} />
        </MemoryRouter>
      </RecoilRoot>,
    );

    expect(screen.getByText('테스트 제목')).toBeInTheDocument();
  });

  test('shows bookmark button when isResult is true', () => {
    render(
      <RecoilRoot>
        <MemoryRouter>
          <NavBar title="테스트 제목" isResult={true} isBookmark={false} />
        </MemoryRouter>
      </RecoilRoot>,
    );

    expect(screen.getByAltText('Bookmark')).toBeInTheDocument();
  });
});

describe('HeaderInfo Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders user information', () => {
    render(
      <RecoilRoot>
        <HeaderInfo />
      </RecoilRoot>,
    );

    expect(screen.getByText('남')).toBeInTheDocument();
    expect(screen.getByText('1990년 01월 01일 (양력)')).toBeInTheDocument();
  });
});

// ItemList
describe('ItemList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f) => f()); // Mock useEffect
  });

  test('renders fortune data when available', () => {
    render(
      <RecoilRoot>
        <MemoryRouter>
          <ItemList />
        </MemoryRouter>
      </RecoilRoot>,
    );

    // 모든 이미지를 배열로 가져오기
    const images = screen.getAllByRole('img');

    // src 속성을 기준으로 특정 이미지 확인
    const img1 = images.find((img) => img.getAttribute('src') === '/path1.jpg');
    const img2 = images.find((img) => img.getAttribute('src') === '/path3.jpg');

    expect(img1).toBeInTheDocument();
    expect(img2).toBeInTheDocument();
  });
});
