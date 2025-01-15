import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CategoryButton from '@/components/Home/CategoryButton';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Mock `ResponsiveImage`
jest.mock('../../components/Common/ResponsiveImage', () => ({
  __esModule: true,
  default: ({ webpSrc }: { webpSrc: string }) => <img src={webpSrc} alt="search" />,
}));

describe('CategoryButton Component', () => {
  const mockedNavigate = jest.fn();

  beforeEach(() => {
    require('react-router-dom').useNavigate.mockImplementation(() => mockedNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders button with correct label and images', () => {
    render(
      <BrowserRouter>
        <CategoryButton webpIcon="/home/webp/tarot.webp" pngIcon="/home/png/tarot.png" label="타로" pageUrl="tarot" />
      </BrowserRouter>,
    );

    // Label 검증
    expect(screen.getByText('타로')).toBeInTheDocument();

    // 이미지 검증
    const image = screen.getByAltText('search');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/home/webp/tarot.webp'); // WebP 이미지 경로 확인
  });

  test('navigates to correct page on click', () => {
    render(
      <BrowserRouter>
        <CategoryButton webpIcon="/home/webp/tarot.webp" pngIcon="/home/png/tarot.png" label="타로" pageUrl="tarot" />
      </BrowserRouter>,
    );

    // 클릭 이벤트
    const button = screen.getByText('타로');
    fireEvent.click(button);

    // `useNavigate`가 올바른 경로로 호출되었는지 확인
    expect(mockedNavigate).toHaveBeenCalledWith('/tarot');
  });
});
