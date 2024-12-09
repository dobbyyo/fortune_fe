import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { userIdSelector } from '@/stores/useAuthStore';
import { fortuneZodiacState } from '@/stores/useSajuStore';
import { ZodiacFortune } from '@/components/Saju/SajuResult';

export const mockGetLocalStorage = jest.fn();
export const mockSetLocalStorage = jest.fn();

jest.mock('@/lib/localStorage', () => ({
  getLocalStorage: (key: string) => mockGetLocalStorage(key),
  setLocalStorage: mockSetLocalStorage,
}));

jest.mock('recoil', () => ({
  ...jest.requireActual('recoil'),
  useRecoilValue: jest.fn((state) => {
    if (state === userIdSelector) {
      return 1; // Mock user ID
    }
    return null;
  }),
  useRecoilState: jest.fn((state) => {
    if (state === fortuneZodiacState) {
      return [
        {
          zodiacFortune: {
            id: 1,
            name: 'Aries',
            info: 'Aries Info',
            start_year: 1993,
            cycle: 12,
            rest: 1,
            image_url: 'https://example.com/aries.png',
            zodiacGeneral: 'Aries General Fortune',
            zodiacToday: 'Aries Today Fortune',
            yearlyFortunes: {
              '2022': 'Aries 2022 Fortune',
              '2023': 'Aries 2023 Fortune',
            },
          },
        },
        jest.fn(),
      ];
    }
    return [null, jest.fn()];
  }),
  useSetRecoilState: jest.fn(() => jest.fn()),
}));

jest.mock('@/services/queries/saju.query', () => ({
  useZodiacFortuneQuery: jest.fn(() => ({
    data: {
      zodiacFortune: {
        id: 1,
        name: 'Aries',
        info: 'Aries Info',
        start_year: 1993,
        cycle: 12,
        rest: 1,
        image_url: 'https://example.com/aries.png',
        zodiacGeneral: 'Aries General Fortune',
        zodiacToday: 'Aries Today Fortune',
        yearlyFortunes: {
          '2022': 'Aries 2022 Fortune',
          '2023': 'Aries 2023 Fortune',
        },
      },
    },
    isLoading: false,
    isError: false,
  })),
}));

describe('ZodiacFortune Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetLocalStorage.mockImplementation((key) => {
      if (key === 'zodiacFortune') {
        return null; // Mock data absence
      }
      return null;
    });
  });

  test('renders fortune details correctly', () => {
    render(
      <RecoilRoot>
        <MemoryRouter>
          <ZodiacFortune />
        </MemoryRouter>
      </RecoilRoot>,
    );

    expect(screen.getByText('Aries')).toBeInTheDocument();
    expect(screen.getByText('Aries Info')).toBeInTheDocument();
  });
});
