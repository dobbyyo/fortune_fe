import { TermsOfUse } from '@/pages/Agreement';
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
    termsOfUse: {
      title: '이용약관',
      description: '이용약관 설명',
      keywords: '이용약관, 서비스',
      canonical: '/terms-of-use',
      ogTitle: '이용약관',
      ogDescription: '이용약관 설명',
    },
  },
}));

describe('TermsOfUse Component', () => {
  test('renders MetaTag, BackNavBar, and Line components', () => {
    render(<TermsOfUse />);

    // MetaTag 확인
    expect(document.title).toBe('이용약관');

    // BackNavBar 확인
    const backNavBar = screen.getByTestId('BackNavBar');
    expect(backNavBar).toBeInTheDocument();
    expect(backNavBar).toHaveTextContent('이용약관');

    // Line 확인
    const line = screen.getByTestId('Line');
    expect(line).toBeInTheDocument();
  });

  test('renders terms with correct titles', () => {
    render(<TermsOfUse />);

    const termTitles = [
      '제1조 (목적)',
      '제2조 (정의)',
      '제3조 (약관의 효력 및 변경)',
      '제4조 (회원가입 및 계정 관리)',
      '제5조 (서비스의 제공 및 변경)',
      '제6조 (서비스 이용 제한)',
      '제7조 (결제 및 환불)',
      '제8조 (회사의 의무)',
      '제9조 (사용자의 의무)',
      '제10조 (면책 조항)',
      '제11조 (분쟁 해결)',
      '부칙',
    ];

    termTitles.forEach((title) => {
      const titleElement = screen.getByText(title);
      expect(titleElement).toBeInTheDocument();
    });
  });
});
