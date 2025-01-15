import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { useAiDreamMutation } from '@/services/queries/dream.query';
import { aiDreamMainTitleTab } from '@/stores/useDreamStore';
import DreamForm from '@/components/Dream/DreamForm';

jest.mock('@/services/queries/dream.query', () => ({
  useAiDreamMutation: jest.fn(),
}));

describe('DreamForm Component', () => {
  beforeEach(() => {
    // `useAiDreamMutation` 모킹
    (useAiDreamMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(), // mutate 함수 모의 구현
    });
  });

  test('renders the form and its elements', () => {
    render(
      <RecoilRoot initializeState={({ set }) => set(aiDreamMainTitleTab, '사람/행동')}>
        <DreamForm />
      </RecoilRoot>,
    );

    // 제목 확인
    const title = screen.getByText('간단한 설명');
    expect(title).toBeInTheDocument();

    // 입력 필드 확인
    const input = screen.getByPlaceholderText('예시) 모던한 느낌의 사람 이름');
    expect(input).toBeInTheDocument();

    // 버튼 확인
    const button = screen.getByRole('button', { name: '생성하기' });
    expect(button).toBeInTheDocument();
  });

  test('updates input value on change', () => {
    render(
      <RecoilRoot initializeState={({ set }) => set(aiDreamMainTitleTab, '사람/행동')}>
        <DreamForm />
      </RecoilRoot>,
    );

    const input = screen.getByPlaceholderText('예시) 모던한 느낌의 사람 이름');

    // 값 변경
    fireEvent.change(input, { target: { value: '꿈에 나타난 사람 이름' } });
    expect(input).toHaveValue('꿈에 나타난 사람 이름');
  });

  test('calls mutate function on form submission', () => {
    const mockMutate = jest.fn();
    (useAiDreamMutation as jest.Mock).mockReturnValue({ mutate: mockMutate });

    render(
      <RecoilRoot initializeState={({ set }) => set(aiDreamMainTitleTab, '사람/행동')}>
        <DreamForm />
      </RecoilRoot>,
    );

    const input = screen.getByPlaceholderText('예시) 모던한 느낌의 사람 이름');
    const button = screen.getByRole('button', { name: '생성하기' });

    // 입력값 업데이트
    fireEvent.change(input, { target: { value: '꿈에 나타난 사람 이름' } });

    // 폼 제출
    fireEvent.click(button);

    // `mutate` 함수 호출 확인
    expect(mockMutate).toHaveBeenCalledWith({
      payload: {
        title: '사람/행동',
        description: '꿈에 나타난 사람 이름',
      },
    });
  });

  test('shows alert if title or description is missing', () => {
    window.alert = jest.fn(); // alert 모의함수 생성

    render(
      <RecoilRoot initializeState={({ set }) => set(aiDreamMainTitleTab, '')}>
        <DreamForm />
      </RecoilRoot>,
    );

    const button = screen.getByRole('button', { name: '생성하기' });

    // 폼 제출
    fireEvent.click(button);

    // alert 호출 확인
    expect(window.alert).toHaveBeenCalledWith('카테고리와 설명을 입력해주세요.');
  });
});
