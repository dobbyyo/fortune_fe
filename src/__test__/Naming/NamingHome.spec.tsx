import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';
import { NamingHome } from '@/pages/Naming';

jest.mock('@/components/Naming/RenderTabContent', () => ({
  __esModule: true,
  default: jest.fn(({ activeTabKey }: { activeTabKey: string }) => <div>Mocked Content for {activeTabKey}</div>),
}));

jest.mock('../../config/config', () => ({
  config: {
    apiUrl: 'http://localhost:mock', // 테스트 환경의 Mock 데이터
  },
}));

describe('NamingHome Component', () => {
  test('renders MetaTag, NavBar, and Line components', () => {
    render(
      <HelmetProvider>
        <RecoilRoot>
          <NamingHome />
        </RecoilRoot>
      </HelmetProvider>,
    );

    expect(screen.getByText('작명')).toBeInTheDocument();
  });

  test('switches tabs and renders corresponding content', () => {
    render(
      <HelmetProvider>
        <RecoilRoot>
          <NamingHome />
        </RecoilRoot>
      </HelmetProvider>,
    );

    // Default tab
    expect(screen.getByText('Mocked Content for aiNaming')).toBeInTheDocument();

    // Switch to "전문가 의뢰"
    const professionalTab = screen.getByText('전문가 의뢰');
    fireEvent.click(professionalTab);
    expect(screen.getByText('Mocked Content for professionalNaming')).toBeInTheDocument();
  });
});
