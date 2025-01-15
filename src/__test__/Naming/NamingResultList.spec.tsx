import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import NamingResultList from '@/components/Naming/NamingResultList';
import { aiNamingState, savedAiNamingState, namingMainTitleTab } from '@/stores/useNamingStore';
import { authState } from '@/stores/useAuthStore';

const mockBookmarkMutate = jest.fn();
const mockUnbookmarkMutate = jest.fn();

jest.mock('@/services/queries/naming.query', () => ({
  useAiNamingBookmarkMutation: jest.fn(() => ({
    mutate: mockBookmarkMutate,
  })),
  useAiNamingUnBookmarkMutation: jest.fn(() => ({
    mutate: mockUnbookmarkMutate,
  })),
}));

describe('NamingResultList Component', () => {
  const mockNamingData = {
    naming: [
      { name: '아이디어 1', hanja: 'aa', description: '설명 1', bookmarked: true },
      { name: '아이디어 2', hanja: 'aa', description: '설명 2', bookmarked: false },
    ],
  };

  const mockSavedNamings = [
    {
      name: '아이디어 1',
      description: '설명 1',
      naming: {
        id: 1,
        mainTitle: 'AI 작명',
        date: '2021-09-01',
      },
      user: {
        id: 1,
      },
      id: 1,
    },
  ];

  beforeEach(() => {
    mockBookmarkMutate.mockClear();
    mockUnbookmarkMutate.mockClear();
    localStorage.clear();
  });

  test('renders naming data and handles bookmark toggle', () => {
    render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(aiNamingState, mockNamingData);
          set(savedAiNamingState, mockSavedNamings);
          set(namingMainTitleTab, 'AI 작명');
          set(authState, { isAuthenticated: true, isLoading: false });
        }}
      >
        <NamingResultList />
      </RecoilRoot>,
    );

    // Render된 이름 확인
    expect(screen.getByText('아이디어 1')).toBeInTheDocument();
    expect(screen.getByText('아이디어 2')).toBeInTheDocument();

    // 북마크 버튼 확인
    const bookmarkButton1 = screen.getAllByRole('button')[0];
    fireEvent.click(bookmarkButton1);

    // 북마크 해제 호출 확인
    expect(mockUnbookmarkMutate).toHaveBeenCalledWith({ payload: { id: 1 } }, expect.anything());

    // 북마크 추가 버튼 클릭
    const bookmarkButton2 = screen.getAllByRole('button')[1];
    fireEvent.click(bookmarkButton2);

    // 북마크 추가 호출 확인
    expect(mockBookmarkMutate).toHaveBeenCalledWith(
      {
        payload: {
          mainTitle: 'AI 작명',
          namings: [{ name: '아이디어 2', description: '설명 2' }],
        },
      },
      expect.anything(),
    );
  });

  test('renders message when no naming data is available', () => {
    render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(aiNamingState, null);
          set(savedAiNamingState, []);
        }}
      >
        <NamingResultList />
      </RecoilRoot>,
    );

    expect(screen.getByText('생성된 이름이 없습니다. 다시 시도해주세요.')).toBeInTheDocument();
  });
});
