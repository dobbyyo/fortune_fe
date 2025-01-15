import { MarketingUseAgreement } from '@/pages/Agreement';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

// Mock 하위 컴포넌트
jest.mock('@/components/Common', () => ({
  BackNavBar: ({ title }: { title: string }) => <div data-testid="BackNavBar">{title}</div>,
  Line: () => <div data-testid="Line" />,
}));

jest.mock('@/components/Seo', () => ({
  MetaTag: ({ title }: { title: string }) => <title>{title}</title>,
}));

jest.mock('@/config/metaData', () => ({
  authMetaData: {
    marketingUseAgreement: {
      title: '마케팅 활용 동의',
      description: '마케팅 활용 동의 설명',
      keywords: '마케팅, 활용, 동의',
      canonical: '/marketing-use-agreement',
      ogTitle: '마케팅 활용 동의',
      ogDescription: '마케팅 활용 동의 설명',
    },
  },
}));

describe('MarketingUseAgreement Component', () => {
  test('renders MetaTag, BackNavBar, and Line components', () => {
    render(<MarketingUseAgreement />);

    // MetaTag 확인
    expect(document.title).toBe('마케팅 활용 동의');

    // BackNavBar 확인
    const backNavBar = screen.getByTestId('BackNavBar');
    expect(backNavBar).toBeInTheDocument();
    expect(backNavBar).toHaveTextContent('이용약관');

    // Line 확인
    const line = screen.getByTestId('Line');
    expect(line).toBeInTheDocument();
  });

  test('renders sections with correct titles and content', () => {
    render(<MarketingUseAgreement />);

    const sectionTitles = [
      '1. 개인정보 수집 및 이용 목적',
      '2. 수집하는 개인정보 항목',
      '3. 보유 및 이용 기간',
      '4. 제3자 제공 및 위탁',
      '동의 철회 방법',
    ];

    sectionTitles.forEach((title) => {
      const titleElement = screen.getByText(title);
      expect(titleElement).toBeInTheDocument();
    });
  });
});
