import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import AiNaming from '@/components/Naming/AiNaming';

jest.mock('@/config/config', () => ({
  config: {
    kakaoApiKey: 'mockKakaoApiKey',
    kakaoRedirectUri: 'http://mock-redirect-uri',
  },
}));

jest.mock('@/services/queries/naming.query', () => ({
  useAiNamingMutation: jest.fn(() => ({
    mutate: jest.fn(),
  })),
}));

describe('AiNaming Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders categories and input field', () => {
    render(
      <RecoilRoot>
        <AiNaming />
      </RecoilRoot>,
    );

    // Check if categories are rendered
    expect(screen.getByText('사람')).toBeInTheDocument();
    expect(screen.getByText('반려동물')).toBeInTheDocument();
    expect(screen.getByText('아이디어')).toBeInTheDocument();

    // Check if input field is rendered
    const input = screen.getByPlaceholderText('예시) 모던한 느낌의 사람 이름');
    expect(input).toBeInTheDocument();
  });

  test('handles category selection', () => {
    render(
      <RecoilRoot>
        <AiNaming />
      </RecoilRoot>,
    );

    // Click on a category
    const categoryButton = screen.getByText('사람');
    fireEvent.click(categoryButton);

    // Check if category is active
    expect(categoryButton.parentElement).toHaveClass('bg-[#eded]');
  });

  test('handles input change', () => {
    render(
      <RecoilRoot>
        <AiNaming />
      </RecoilRoot>,
    );

    // Input some text
    const input = screen.getByPlaceholderText('예시) 모던한 느낌의 사람 이름');
    fireEvent.change(input, { target: { value: '테스트 설명' } });

    // Check if input value is updated
    expect(input).toHaveValue('테스트 설명');
  });

  test('alerts if category or content is missing', () => {
    render(
      <RecoilRoot>
        <AiNaming />
      </RecoilRoot>,
    );

    // Mock alert
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Click the generate button without selecting a category or entering content
    const generateButton = screen.getByText('생성하기');
    fireEvent.click(generateButton);

    // Check if alert was called
    expect(alertMock).toHaveBeenCalledWith('카테고리와 설명을 입력해주세요.');

    alertMock.mockRestore();
  });

  test('calls mutate function with correct payload', () => {
    // 모듈에서 useAiNamingMutation를 목업
    const mockMutate = jest.fn();
    const { useAiNamingMutation } = require('@/services/queries/naming.query');
    useAiNamingMutation.mockReturnValue({ mutate: mockMutate });

    render(
      <RecoilRoot>
        <AiNaming />
      </RecoilRoot>,
    );

    // 카테고리 선택 및 텍스트 입력
    const categoryButton = screen.getByText('사람');
    fireEvent.click(categoryButton);

    const input = screen.getByPlaceholderText('예시) 모던한 느낌의 사람 이름');
    fireEvent.change(input, { target: { value: '테스트 설명' } });

    // 생성 버튼 클릭
    const generateButton = screen.getByText('생성하기');
    fireEvent.click(generateButton);

    // mutate가 올바른 payload로 호출되었는지 확인
    expect(mockMutate).toHaveBeenCalledWith({
      payload: { mainTitle: '사람', content: '테스트 설명' },
    });
  });
});
