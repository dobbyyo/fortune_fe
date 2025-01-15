import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { userIdSelector } from '@/stores/useAuthStore';
import { fortuneConstellationState } from '@/stores/useSajuStore';
import { StarSignFortune } from '@/components/Saju/SajuResult';

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
    if (state === fortuneConstellationState) {
      return [
        {
          constellation: {
            id: 1,
            name: 'Aries',
            start_date: '2022-03-21',
            end_date: '2022-04-19',
            image_url: 'https://example.com/aries.png',
            constellationGeneral: 'Aries General Fortune',
            constellationToday: 'Aries Today Fortune',
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
  useConstellationFortuneQuery: jest.fn(() => ({
    data: {
      constellation: {
        id: 1,
        name: 'Aries',
        start_date: '2022-03-21',
        end_date: '2022-04-19',
        image_url: 'https://example.com/aries.png',
        constellationGeneral: 'Aries General Fortune',
        constellationToday: 'Aries Today Fortune',
      },
    },
    isLoading: false,
    isError: false,
  })),
}));

describe('StarSignFortune Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetLocalStorage.mockImplementation((key) => {
      if (key === 'fortuneConstellationData') {
        return null; // Mock data absence
      }
      return null;
    });
  });

  test('renders fortune details correctly', () => {
    render(
      <RecoilRoot>
        <MemoryRouter>
          <StarSignFortune />
        </MemoryRouter>
      </RecoilRoot>,
    );

    expect(screen.getByText('Aries General Fortune')).toBeInTheDocument();
    expect(screen.getByText('Aries Today Fortune')).toBeInTheDocument();
    expect(screen.getByAltText('Aries')).toHaveAttribute('src', 'https://example.com/aries.png');
  });
});
