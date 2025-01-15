import '@testing-library/jest-dom';
import { DreamHome } from '@/pages/Dream';
import { render, screen } from '@testing-library/react';

jest.mock('@/config/config', () => ({
  config: {
    kakaoApiKey: 'test-kakao-key',
    kakaoRedirectUri: 'http://localhost/callback',
  },
}));

jest.mock('@/components/Common', () => ({
  NavBar: ({ title }: { title: string }) => <div data-testid="NavBar">{title}</div>,
  Line: () => <div data-testid="Line" />,
}));

jest.mock('@/components/Seo', () => ({
  MetaTag: ({ title }: { title: string }) => <title>{title}</title>,
}));

jest.mock('@/components/Dream', () => ({
  DreamTitle: () => <div data-testid="DreamTitle">Dream Title Component</div>,
  DreamCategory: () => <div data-testid="DreamCategory">Dream Category Component</div>,
  DreamForm: () => <div data-testid="DreamForm">Dream Form Component</div>,
}));

jest.mock('@/config/metaData', () => ({
  dreamMetaData: {
    dreamHome: {
      title: '꿈해몽',
      description: '꿈해몽 페이지 설명',
      keywords: '꿈, 해몽, 꿈해몽',
      canonical: '/dream',
      ogTitle: '꿈해몽',
      ogDescription: '꿈해몽 페이지 설명',
    },
  },
}));

describe('DreamHome Component', () => {
  test('renders MetaTag, NavBar, and Line components', () => {
    render(<DreamHome />);

    // MetaTag 확인
    expect(document.title).toBe('꿈해몽');

    // NavBar 확인
    const navBar = screen.getByTestId('NavBar');
    expect(navBar).toBeInTheDocument();
    expect(navBar).toHaveTextContent('꿈해몽');

    // Line 확인
    const line = screen.getByTestId('Line');
    expect(line).toBeInTheDocument();
  });

  test('renders DreamTitle, DreamCategory, and DreamForm components', () => {
    render(<DreamHome />);

    const dreamTitle = screen.getByTestId('DreamTitle');
    expect(dreamTitle).toBeInTheDocument();
    expect(dreamTitle).toHaveTextContent('Dream Title Component');

    const dreamCategory = screen.getByTestId('DreamCategory');
    expect(dreamCategory).toBeInTheDocument();
    expect(dreamCategory).toHaveTextContent('Dream Category Component');

    const dreamForm = screen.getByTestId('DreamForm');
    expect(dreamForm).toBeInTheDocument();
    expect(dreamForm).toHaveTextContent('Dream Form Component');
  });
});
