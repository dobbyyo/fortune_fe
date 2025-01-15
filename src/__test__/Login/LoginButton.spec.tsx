import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginButton from '@/components/Login/LoginButton';

Object.defineProperty(window, 'location', {
  writable: true,
  value: { href: '' },
});

jest.mock('@/config/config', () => ({
  config: {
    kakaoApiKey: 'test-kakao-key',
    kakaoRedirectUri: 'http://localhost/callback',
  },
}));

describe('LoginButton Component', () => {
  test('renders the login button with correct text', () => {
    render(<LoginButton />);

    const button = screen.getByRole('button', { name: '카카오톡으로 로그인' });
    expect(button).toBeInTheDocument();
  });

  test('sets window.location.href to KAKAO_AUTH_URL on click', () => {
    render(<LoginButton />);

    const button = screen.getByRole('button', { name: '카카오톡으로 로그인' });
    fireEvent.click(button);

    expect(window.location.href).toBe(
      'https://kauth.kakao.com/oauth/authorize?client_id=test-kakao-key&redirect_uri=http://localhost/callback&response_type=code',
    );
  });
});
