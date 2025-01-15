import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { authState } from '@/stores/useAuthStore';
import Login from '@/pages/Login';
import { HelmetProvider } from 'react-helmet-async';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('@/components/Login/LoginIcon', () => ({
  __esModule: true,
  default: () => <div>Mocked LoginIcon</div>,
}));

jest.mock('@/components/Login/LoginButton', () => ({
  __esModule: true,
  default: () => <div>Mocked LoginButton</div>,
}));

describe('Login Component', () => {
  test('renders MetaTag, LoginIcon, and LoginButton', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <RecoilRoot>
            <Login />
          </RecoilRoot>
        </BrowserRouter>
      </HelmetProvider>,
    );

    expect(screen.getByText('Mocked LoginIcon')).toBeInTheDocument();
    expect(screen.getByText('Mocked LoginButton')).toBeInTheDocument();
  });

  test('redirects to home if user is authenticated', async () => {
    const mockAuthState = {
      isLoading: false,
      isAuthenticated: true,
    };

    render(
      <HelmetProvider>
        <BrowserRouter>
          <RecoilRoot initializeState={({ set }) => set(authState, mockAuthState)}>
            <Login />
          </RecoilRoot>
        </BrowserRouter>
      </HelmetProvider>,
    );

    // `useEffect` 실행 대기
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});
