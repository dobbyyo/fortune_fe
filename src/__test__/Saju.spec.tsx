import { SajuHome } from '@/pages/Saju';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

jest.mock('@/hooks/dateHook', () => ({
  todayDate: jest.fn(() => '2023-12-07'),
}));

jest.mock('@/lib/localStorage', () => ({
  getLocalStorage: jest.fn(() => '2023-12-06'), // Mocked 값: 어제 날짜
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('SajuHome Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('renders categories correctly', () => {
    render(
      <RecoilRoot>
        <MemoryRouter>
          <SajuHome />
        </MemoryRouter>
      </RecoilRoot>,
    );

    // 카테고리 버튼 렌더링 확인
    const categories = ['오늘의 운세', '내일의 운세', '지정일 운세', '신년운세', '토정비결', '정통사주'];
    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  test('navigates to the correct page on button click', () => {
    render(
      <RecoilRoot>
        <MemoryRouter>
          <SajuHome />
        </MemoryRouter>
      </RecoilRoot>,
    );

    const todayFortuneButton = screen.getByText('오늘의 운세');
    fireEvent.click(todayFortuneButton);

    expect(mockNavigate).toHaveBeenCalledWith('/saju/today');
  });

  test('resets state and localStorage if date changes', () => {
    render(
      <RecoilRoot>
        <MemoryRouter>
          <SajuHome />
        </MemoryRouter>
      </RecoilRoot>,
    );

    // Recoil 상태 초기화 확인
    expect(localStorage.getItem('fortuneExplainData')).toBeNull();
    expect(localStorage.getItem('fortuneZodiacData')).toBeNull();
    expect(localStorage.getItem('fortuneConstellationData')).toBeNull();
    expect(localStorage.getItem('todayDate')).toBe('2023-12-07');
  });
});
