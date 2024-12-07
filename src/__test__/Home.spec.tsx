import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '@/pages/Home';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate, // Mock 처리
}));

jest.mock('@/components/Home', () => ({
  CategoryButton: ({ icon, label, pageUrl }: { icon: string; label: string; pageUrl: string }) => (
    <button onClick={() => {}} data-testid={`category-button-${pageUrl}`}>
      <img src={icon} alt={`${label} 아이콘`} />
      <span>{label}</span>
    </button>
  ),
}));

describe('Home Component', () => {
  test('renders search input and categories', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    // 검색 입력란이 존재하는지 확인
    expect(screen.getByPlaceholderText('검색할 내용을 입력해주세요.')).toBeInTheDocument();

    // 카테고리 버튼이 모두 렌더링되는지 확인
    expect(screen.getByText('타로')).toBeInTheDocument();
    expect(screen.getByText('사주')).toBeInTheDocument();
    expect(screen.getByText('꿈해몽')).toBeInTheDocument();
    expect(screen.getByText('작명')).toBeInTheDocument();
  });

  test('navigates to the correct page based on search term', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const searchInput = screen.getByPlaceholderText('검색할 내용을 입력해주세요.');
    const form = searchInput.closest('form') as HTMLFormElement;

    // 타로 검색
    fireEvent.change(searchInput, { target: { value: '타로' } });
    fireEvent.submit(form);
    expect(mockNavigate).toHaveBeenCalledWith('/tarot');

    // 사주 검색
    fireEvent.change(searchInput, { target: { value: '사주' } });
    fireEvent.submit(form);
    expect(mockNavigate).toHaveBeenCalledWith('/saju');

    // 매칭되지 않는 검색어
    fireEvent.change(searchInput, { target: { value: '없는키워드' } });
    fireEvent.submit(form);
    expect(alertMock).toHaveBeenCalledWith('해당 키워드와 매칭되는 카테고리가 없습니다.');
  });

  test('renders category buttons with correct labels', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    // 카테고리 버튼들이 제대로 렌더링되는지 확인
    expect(screen.getByTestId('category-button-tarot')).toBeInTheDocument();
    expect(screen.getByTestId('category-button-saju')).toBeInTheDocument();
    expect(screen.getByTestId('category-button-dream')).toBeInTheDocument();
    expect(screen.getByTestId('category-button-naming')).toBeInTheDocument();
  });
});
