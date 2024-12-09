import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { explainFortuneState } from '@/stores/useSajuStore';
import { userIdSelector } from '@/stores/useAuthStore';
import { TodayFortune } from '@/components/Saju/SajuResult';

// Mock LocalStorage
export const mockGetLocalStorage = jest.fn();
export const mockSetLocalStorage = jest.fn();

jest.mock('@/lib/localStorage', () => ({
  getLocalStorage: (key: string) => mockGetLocalStorage(key),
  setLocalStorage: mockSetLocalStorage,
}));

// Mock Recoil
jest.mock('recoil', () => ({
  ...jest.requireActual('recoil'),
  useRecoilValue: jest.fn((state) => {
    if (state === userIdSelector) {
      return 1; // Mock user ID
    }
    return null;
  }),
  useRecoilState: jest.fn((state) => {
    if (state === explainFortuneState) {
      return [
        {
          explanationData: {
            generalFortune: '총운 설명',
            wealthFortune: '재물운 설명',
            loveFortune: '연애운 설명',
            careerFortune: '사업운 설명',
            healthFortune: '건강운 설명',
            studyFortune: '학업운 설명',
            luckyElements: ['네잎 클로버', '행운의 동전'],
            luckyOutfit: '행운의 옷',
          },
        },
        jest.fn(),
      ];
    }
    return [null, jest.fn()];
  }),
  useSetRecoilState: jest.fn(() => jest.fn()),
}));

// Mock Query
jest.mock('@/services/queries/saju.query', () => ({
  useTodayFortuneExplainQuery: jest.fn(() => ({
    data: null,
    isLoading: false,
    isError: false,
  })),
}));

describe('TodayFortune Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetLocalStorage.mockImplementation((key) => {
      if (key === 'fortuneExplainData') {
        return null; // Mock data absence
      }
      return null;
    });
  });

  test('renders fortune details correctly', () => {
    render(
      <RecoilRoot>
        <MemoryRouter>
          <TodayFortune />
        </MemoryRouter>
      </RecoilRoot>,
    );

    expect(screen.getByText('🍀총운')).toBeInTheDocument();
    expect(screen.getByText('총운 설명')).toBeInTheDocument();
    expect(screen.getByText('🍀재물운')).toBeInTheDocument();
    expect(screen.getByText('재물운 설명')).toBeInTheDocument();
  });
});
