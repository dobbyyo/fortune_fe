import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomeSearch from '@/components/Home/HomeSearch';

// Mock navigate 함수
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('HomeSearch Component', () => {
  const mockedNavigate = jest.fn();

  beforeEach(() => {
    // Mock useNavigate
    require('react-router-dom').useNavigate.mockImplementation(() => mockedNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders input field and search button', () => {
    render(
      <BrowserRouter>
        <HomeSearch />
      </BrowserRouter>,
    );

    // 입력 필드와 이미지 렌더링 확인
    expect(screen.getByPlaceholderText('검색할 내용을 입력해주세요.')).toBeInTheDocument();
    expect(screen.getByAltText('search')).toBeInTheDocument();
  });

  test('updates input value on user input', () => {
    render(
      <BrowserRouter>
        <HomeSearch />
      </BrowserRouter>,
    );

    const input = screen.getByPlaceholderText('검색할 내용을 입력해주세요.');

    fireEvent.change(input, { target: { value: '사주' } });

    expect(input).toHaveValue('사주');
  });

  test('navigates to correct category on search click', () => {
    render(
      <BrowserRouter>
        <HomeSearch />
      </BrowserRouter>,
    );

    const input = screen.getByPlaceholderText('검색할 내용을 입력해주세요.');
    const searchButton = screen.getByAltText('search');

    // 입력값 설정
    fireEvent.change(input, { target: { value: '사주' } });

    // 검색 버튼 클릭
    fireEvent.click(searchButton);

    // navigate가 호출되었는지 확인
    expect(mockedNavigate).toHaveBeenCalledWith('/saju');
  });

  test('shows alert for unmatched search term', () => {
    window.alert = jest.fn();

    render(
      <BrowserRouter>
        <HomeSearch />
      </BrowserRouter>,
    );

    const input = screen.getByPlaceholderText('검색할 내용을 입력해주세요.');
    const searchButton = screen.getByAltText('search');

    // 입력값 설정
    fireEvent.change(input, { target: { value: '없는 키워드' } });

    // 검색 버튼 클릭
    fireEvent.click(searchButton);

    // alert 호출 확인
    expect(window.alert).toHaveBeenCalledWith('해당 키워드와 매칭되는 카테고리가 없습니다.');
  });
});
