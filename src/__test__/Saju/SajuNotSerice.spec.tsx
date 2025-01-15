import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotService from '@/components/Common/NotService';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('NotService Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    render(
      <MemoryRouter>
        <NotService />
      </MemoryRouter>,
    );

    // 이미지, 텍스트, 버튼 렌더링 확인
    expect(screen.getByAltText('Not Current Service')).toBeInTheDocument();
    expect(screen.getByText('서비스 준비 중')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '확인' })).toBeInTheDocument();
  });

  test('navigates back on button click', () => {
    render(
      <MemoryRouter>
        <NotService />
      </MemoryRouter>,
    );

    const button = screen.getByRole('button', { name: '확인' });
    fireEvent.click(button);

    // navigate(-1) 호출 확인
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
