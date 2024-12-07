import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { userState } from '@/stores/useAuthStore';
import { todayFortuneState } from '@/stores/useSajuStore';
import { SajuToday } from '@/pages/Saju/TodaySaju';
import { UserResponse } from '@/types/userType';

// Recoil Mock 상태 설정
const mockUserState: UserResponse = {
  id: 1,
  username: '테스트 유저',
  gender: 'MAN',
  birth_date: '1990-01-01',
  birth_time: '00:00:00',
  calendar_type: 'SOLAR',
  language: {
    user_id: 1,
    language: 'ko',
  },
  notification: {
    user_id: 1,
    benefit: true,
    horoscope: true,
  },
  profile: {
    user_id: 1,
    profile_url: 'https://path/to/profile.jpg',
  },
  password: {
    user_id: 1,
    password_lock_status: false,
    hash_password: null,
  },
  created_at: '2023-01-01',
  updated_at: '2023-01-01',
  deleted_at: null,
  provider: 'local',
  email: 'test@example.com',
};

const mockTodayFortune = {
  fortunesData: {
    heavenly: { elements: { img: { one: '/path1.jpg', two: '/path2.jpg' } } },
    earthly: { elements: { img: { three: '/path3.jpg', four: '/path4.jpg' } } },
    heavenlyStemTenGod: ['편인', '정인'],
    earthlyBranchTenGod: ['상관', '겁재'],
    tenStemTwelveStates: ['태', '생'],
    twelveGod: ['정관', '비견'],
  },
} as any;

// Mock 서비스
jest.mock('@/services/queries/saju.query', () => ({
  useTodayFortuneQuery: jest.fn(() => ({
    data: mockTodayFortune,
    isLoading: false,
    isError: false,
  })),
}));

describe('SajuToday Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders HeaderInfo correctly', () => {
    render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(userState, mockUserState);
        }}
      >
        <MemoryRouter>
          <SajuToday />
        </MemoryRouter>
      </RecoilRoot>,
    );

    // HeaderInfo 렌더링 확인
    expect(screen.getByText('테스트 유저')).toBeInTheDocument();
    expect(screen.getByText('남')).toBeInTheDocument();
    expect(screen.getByText('1990년 01월 01일 (양력)')).toBeInTheDocument();
  });

  test('renders ItemList with today fortune data', () => {
    render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(userState, mockUserState);
          set(todayFortuneState, mockTodayFortune);
        }}
      >
        <MemoryRouter>
          <SajuToday />
        </MemoryRouter>
      </RecoilRoot>,
    );

    // 천간 이미지 렌더링 확인
    expect(screen.getByAltText('one')).toBeInTheDocument();
    expect(screen.getByAltText('two')).toBeInTheDocument();

    // 십신 항목 확인
    expect(screen.getByText('편인')).toBeInTheDocument();
    expect(screen.getByText('정인')).toBeInTheDocument();

    // 지지 항목 확인
    expect(screen.getByText('상관')).toBeInTheDocument();
    expect(screen.getByText('겁재')).toBeInTheDocument();
  });

  test('navigates to result page on button click', () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    render(
      <RecoilRoot>
        <MemoryRouter>
          <SajuToday />
        </MemoryRouter>
      </RecoilRoot>,
    );

    const button = screen.getByText('결과보기');
    fireEvent.click(button);

    // navigate('/saju/result') 호출 확인
    expect(mockNavigate).toHaveBeenCalledWith('/saju/result');
  });
});
