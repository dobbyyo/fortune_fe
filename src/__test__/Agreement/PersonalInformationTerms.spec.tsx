import { PersonalInformationTerms } from '@/pages/Agreement';
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
    personalInformationTerms: {
      title: '개인정보 이용약관',
      description: '개인정보 이용약관 설명',
      keywords: '개인정보, 약관',
      canonical: '/personal-information-terms',
      ogTitle: '개인정보 이용약관',
      ogDescription: '개인정보 이용약관 설명',
    },
  },
}));

describe('PersonalInformationTerms Component', () => {
  test('renders MetaTag, BackNavBar, and Line components', () => {
    render(<PersonalInformationTerms />);

    // MetaTag 확인
    expect(document.title).toBe('개인정보 이용약관');

    // BackNavBar 확인
    const backNavBar = screen.getByTestId('BackNavBar');
    expect(backNavBar).toBeInTheDocument();
    expect(backNavBar).toHaveTextContent('개인정보 이용약관');

    // Line 확인
    const line = screen.getByTestId('Line');
    expect(line).toBeInTheDocument();
  });

  test('renders policies with correct titles', () => {
    render(<PersonalInformationTerms />);

    const policyTitles = [
      '제1조 (수집하는 개인정보 항목)',
      '제2조 (개인정보 수집 및 이용 목적)',
      '제3조 (개인정보 보유 및 이용 기간)',
      '제4조 (개인정보 제3자 제공)',
      '제5조 (개인정보 처리 위탁)',
      '제6조 (사용자의 권리와 행사 방법)',
      '제7조 (개인정보의 파기 절차 및 방법)',
      '제8조 (개인정보 보호를 위한 기술적·관리적 조치)',
      '제9조 (문의처)',
      '부칙',
    ];

    policyTitles.forEach((title) => {
      const titleElement = screen.getByText(title);
      expect(titleElement).toBeInTheDocument();
    });
  });
});
