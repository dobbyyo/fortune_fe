import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import NamingResult from '@/pages/Naming/NamingResult';
import { RecoilRoot } from 'recoil';

jest.mock('@/config/config', () => ({
  config: {
    apiUrl: 'http://localhost:mock', // 테스트 환경의 Mock 데이터
  },
}));

jest.mock('@/components/Naming/NamingResultList', () => ({
  __esModule: true,
  default: () => <div>Mocked NamingResultList</div>,
}));

jest.mock('@/components/Common/BackNavBar', () => ({
  __esModule: true,
  default: () => <div>Mocked BackNavBar</div>,
}));

jest.mock('@/components/Common/Line', () => ({
  __esModule: true,
  default: () => <div data-testid="line">Mocked Line</div>,
}));
describe('NamingResult Component', () => {
  test('renders MetaTag, BackNavBar, and Line components', async () => {
    render(
      <HelmetProvider>
        <RecoilRoot>
          <NamingResult />
        </RecoilRoot>
      </HelmetProvider>,
    );

    // Mocked components 확인
    expect(screen.getByText('Mocked BackNavBar')).toBeInTheDocument();
    expect(screen.getByTestId('line')).toBeInTheDocument();
    expect(screen.getByText('Mocked NamingResultList')).toBeInTheDocument();
  });
});
