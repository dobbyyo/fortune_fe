import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '@/pages/Login';

jest.mock('@/config/config', () => ({
  config: {
    kakaoApiKey: 'mockKakaoApiKey',
    kakaoRedirectUri: 'http://mock-redirect-uri',
  },
}));

describe('Login Component', () => {
  let originalLocation = window.location;

  beforeAll(() => {
    // 기존 window.location 저장
    originalLocation = window.location;

    // window.location.href를 Mock 처리
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: '' },
    });
  });

  afterAll(() => {
    // 원래 `window.location` 복원
    window.location = originalLocation;
  });

  test('renders login button and logo', () => {
    render(<Login />);

    // 로고 이미지 확인
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();

    // 카카오 로그인 버튼 확인
    const loginButton = screen.getByRole('button', { name: /카카오톡으로 로그인/i });
    expect(loginButton).toBeInTheDocument();
  });

  test('redirects to Kakao auth URL on button click', () => {
    render(<Login />);

    // Mock 환경 변수
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=mockKakaoApiKey&redirect_uri=http://mock-redirect-uri&response_type=code`;

    // 버튼 클릭 이벤트
    const loginButton = screen.getByRole('button', { name: /카카오톡으로 로그인/i });
    fireEvent.click(loginButton);

    // window.location.href가 올바르게 설정되었는지 확인
    expect(window.location.href).toBe(KAKAO_AUTH_URL);
  });
});
