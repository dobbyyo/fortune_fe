import { SajuHome } from '@/pages/Saju';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

const mockGetLocalStorage = jest.fn();
const mockSetLocalStorage = jest.fn();
const mockRemoveLocalStorage = jest.fn();

jest.mock('@/lib/localStorage', () => ({
  getLocalStorage: jest.fn(() => mockGetLocalStorage()),
  setLocalStorage: jest.fn((key, value) => mockSetLocalStorage(key, value)),
  removeLocalStorage: jest.fn((key) => mockRemoveLocalStorage(key)),
}));

jest.mock('@/hooks/dateHook', () => ({
  todayDate: jest.fn(() => '2023-12-07'), // Mock today's date
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('SajuHome Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders categories correctly', () => {
    render(
      <RecoilRoot>
        <MemoryRouter>
          <SajuHome />
        </MemoryRouter>
      </RecoilRoot>,
    );

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
    mockGetLocalStorage.mockReturnValueOnce({ todayDate: '2023-12-06' }); // Mock yesterday's date

    render(
      <RecoilRoot>
        <MemoryRouter>
          <SajuHome />
        </MemoryRouter>
      </RecoilRoot>,
    );

    // Check that Recoil states are reset
    expect(mockRemoveLocalStorage).toHaveBeenCalledWith('fortuneExplainData');
    expect(mockRemoveLocalStorage).toHaveBeenCalledWith('fortuneZodiacData');
    expect(mockRemoveLocalStorage).toHaveBeenCalledWith('fortuneConstellationData');
    expect(mockRemoveLocalStorage).toHaveBeenCalledWith('todayFortuneBookmark');

    // Check that today's date is saved
    expect(mockSetLocalStorage).toHaveBeenCalledWith('todayDate', { todayDate: '2023-12-07' });
  });

  test('does not reset localStorage if date matches', () => {
    mockGetLocalStorage.mockReturnValueOnce({ todayDate: '2023-12-07' }); // Mock same date

    render(
      <RecoilRoot>
        <MemoryRouter>
          <SajuHome />
        </MemoryRouter>
      </RecoilRoot>,
    );

    // Ensure no localStorage values are cleared
    expect(mockRemoveLocalStorage).not.toHaveBeenCalled();
    expect(mockSetLocalStorage).not.toHaveBeenCalled();
  });
});
