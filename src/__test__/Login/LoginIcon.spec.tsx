import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LoginIcon from '@/components/Login/LoginIcon';

// Mock `ResponsiveImage`
jest.mock('../../components/Common/ResponsiveImage', () => ({
  __esModule: true,
  default: ({ webpSrc, pngSrc, alt }: { webpSrc: string; pngSrc: string; alt: string }) => (
    <img src={webpSrc || pngSrc} alt={alt} />
  ),
}));

describe('LoginIcon Component', () => {
  test('renders ResponsiveImage with correct props', () => {
    render(<LoginIcon />);

    const image = screen.getByAltText('logo');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/login/png/login-logo.png'); // WebP 경로 확인
  });
});
