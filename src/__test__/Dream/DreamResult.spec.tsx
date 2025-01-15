import { DreamResult } from '@/pages/Dream';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

// Mock 하위 컴포넌트
jest.mock('@/components/Common', () => ({
  BackNavBar: ({ title }: { title: string }) => <div data-testid="BackNavBar">{title}</div>,
  Line: () => <div data-testid="Line" />,
}));

jest.mock('@/components/Seo', () => ({
  MetaTag: ({ title }: { title: string }) => <title>{title}</title>,
}));

jest.mock('@/components/Dream', () => ({
  DreamResultList: () => <div data-testid="DreamResultList">Dream Result List Component</div>,
}));

jest.mock('@/config/metaData', () => ({
  dreamMetaData: {
    dreamResult: {
      title: '꿈해몽 결과',
      description: '꿈해몽 결과 페이지 설명',
      keywords: '꿈, 해몽, 결과',
      canonical: '/dream/result',
      ogTitle: '꿈해몽 결과',
      ogDescription: '꿈해몽 결과 페이지 설명',
    },
  },
}));

describe('DreamResult Component', () => {
  test('renders MetaTag, BackNavBar, Line, and DreamResultList components', () => {
    render(
      <RecoilRoot>
        <DreamResult />
      </RecoilRoot>,
    );

    // MetaTag 확인
    expect(document.title).toBe('꿈해몽 결과');

    // BackNavBar 확인
    const navBar = screen.getByTestId('BackNavBar');
    expect(navBar).toBeInTheDocument();
    expect(navBar).toHaveTextContent('꿈해몽');

    // Line 확인
    const line = screen.getByTestId('Line');
    expect(line).toBeInTheDocument();

    // DreamResultList 확인
    const resultList = screen.getByTestId('DreamResultList');
    expect(resultList).toBeInTheDocument();
    expect(resultList).toHaveTextContent('Dream Result List Component');
  });
});
