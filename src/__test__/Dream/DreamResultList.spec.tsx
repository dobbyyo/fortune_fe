import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import DreamResultList from '@/components/Dream/DreamResultList';
import { aiDreamState, savedAiDreamState } from '@/stores/useDreamStore';
import { authState } from '@/stores/useAuthStore';

const mockBookmarkMutate = jest.fn();
const mockUnbookmarkMutate = jest.fn();

jest.mock('@/services/queries/dream.query', () => ({
  useAiDreamBookmarkMutation: jest.fn(() => ({
    mutate: mockBookmarkMutate,
  })),
  useAiDreamBookmarkDeleteMutation: jest.fn(() => ({
    mutate: mockUnbookmarkMutate,
  })),
}));

describe('DreamResultList Component', () => {
  const mockDreamData = {
    title: '꿈 제목',
    description: '이름과 관련된 꿈을 꿨어요.',
    interpretation: '꿈에 나왔던 이름은 당신의 미래와 관련이 있습니다.',
    bookmarked: false,
  };
  const mockSavedDreamData = {
    title: '꿈 제목',
    user_description: '이름과 관련된 꿈을 꿨어요.',
    description: 'AI 해석 설명',
    id: 123,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z',
    deleted_at: null,
    user: {
      id: 1,
    },
  };

  test('toggles bookmark when user is authenticated', () => {
    render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(aiDreamState, mockDreamData);
          set(authState, { isAuthenticated: true, isLoading: false });
        }}
      >
        <DreamResultList />
      </RecoilRoot>,
    );

    const bookmarkButton = screen.getByRole('button');

    // Bookmark
    fireEvent.click(bookmarkButton);
    expect(mockBookmarkMutate).toHaveBeenCalledWith(
      {
        payload: {
          mainTitle: expect.any(String),
          user_description: mockDreamData.description,
          ai_interpretation: mockDreamData.interpretation,
        },
      },
      expect.anything(),
    );
  });

  test('removes bookmark when user is authenticated', () => {
    render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(aiDreamState, mockDreamData);
          set(savedAiDreamState, mockSavedDreamData);
          set(authState, { isAuthenticated: true, isLoading: false });
        }}
      >
        <DreamResultList />
      </RecoilRoot>,
    );

    const unbookmarkButton = screen.getByRole('button');

    // Unbookmark
    fireEvent.click(unbookmarkButton);
    expect(mockUnbookmarkMutate).toHaveBeenCalledWith(
      {
        payload: { id: mockSavedDreamData.id },
      },
      expect.anything(),
    );
  });
});
