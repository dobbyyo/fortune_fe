import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { NamingHome } from '@/pages/Naming';

jest.mock('../config/config', () => ({
  config: {
    apiUrl: 'http://localhost:mock',
    kakaoApiKey: 'mock-kakao-api-key',
    kakaoRedirectUri: 'http://localhost:mock-redirect',
  },
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // 테스트 환경에서 불필요한 재시도 방지
      },
    },
  });

describe('NamingHome Pages', () => {
  const testQueryClient = createTestQueryClient();

  const renderComponent = () =>
    render(
      <QueryClientProvider client={testQueryClient}>
        <RecoilRoot>
          <MemoryRouter>
            <NamingHome />
          </MemoryRouter>
        </RecoilRoot>
      </QueryClientProvider>,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders NavBar and tabs correctly', () => {
    renderComponent();

    // 탭이 올바르게 렌더링되었는지 확인
    expect(screen.getByText('AI 작명')).toBeInTheDocument();
    expect(screen.getByText('전문가 의뢰')).toBeInTheDocument();
  });

  test('renders AI 작명 content by default', () => {
    renderComponent();

    //원하는 이름을 만들어 드립니다. 문구가 렌더링되었는지 확인
    expect(screen.getByText('원하는 이름을 만들어 드립니다.')).toBeInTheDocument();
  });

  test('switches to 전문가 의뢰 tab and renders its content', () => {
    renderComponent();

    // '전문가 의뢰' 탭 클릭
    const professionalNamingTab = screen.getByText('전문가 의뢰');
    fireEvent.click(professionalNamingTab);

    // '전문가 의뢰' 내용 렌더링 확인
    expect(screen.getByText('서비스 준비 중')).toBeInTheDocument();
  });
});
