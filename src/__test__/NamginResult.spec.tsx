import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { aiNamingState, namingMainTitleTab, savedAiNamingState } from '@/stores/useNamingStore';
import { NamingResult } from '@/pages/Naming';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: () => mockNavigate,
  };
});

jest.mock('@/services/queries/naming.query', () => ({
  useAiNamingBookmarkMutation: jest.fn(),
  useAiNamingUnBookmarkMutation: jest.fn(),
}));

describe('NamingResult Component', () => {
  const mockBookmarkMutate = jest.fn();
  const mockUnBookmarkMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    const { useAiNamingBookmarkMutation, useAiNamingUnBookmarkMutation } = require('@/services/queries/naming.query');

    useAiNamingBookmarkMutation.mockReturnValue({ mutate: mockBookmarkMutate });
    useAiNamingUnBookmarkMutation.mockReturnValue({ mutate: mockUnBookmarkMutate });
  });

  // mock 데이터 수정
  const mockAiNamingData = {
    naming: [
      {
        name: '김민지',
        hanja: '金珉智', // 추가
        description: '테스트 설명 1',
        bookmarked: false,
      },
      {
        name: '이서연',
        hanja: '李瑞妍', // 추가
        description: '테스트 설명 2',
        bookmarked: true,
      },
    ],
  };

  // mock 저장된 데이터
  const mockSavedNamings = [
    {
      name: '이서연',
      description: '테스트 설명 2',
      naming: {
        id: 1,
        mainTitle: '사람',
        date: '2024-12-10',
      },
      user: {
        id: 5,
      },
      id: 1,
    },
  ];

  test('renders correctly with naming data', () => {
    render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(aiNamingState, mockAiNamingData);
          set(savedAiNamingState, mockSavedNamings);
        }}
      >
        <MemoryRouter>
          <NamingResult />
        </MemoryRouter>
      </RecoilRoot>,
    );

    expect(screen.getByText('AI 작명가')).toBeInTheDocument();
    expect(screen.getByText('김민지')).toBeInTheDocument();
    expect(screen.getByText('이서연')).toBeInTheDocument();
    expect(screen.getAllByAltText('북마크').length).toBe(2);
  });

  test('toggles bookmark when bookmark button is clicked', async () => {
    render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(aiNamingState, mockAiNamingData);
          set(savedAiNamingState, mockSavedNamings);
          set(namingMainTitleTab, '사람'); // mainTitle 초기화
        }}
      >
        <MemoryRouter>
          <NamingResult />
        </MemoryRouter>
      </RecoilRoot>,
    );

    fireEvent.click(screen.getAllByAltText('북마크')[0]);

    await waitFor(() => {
      expect(mockBookmarkMutate).toHaveBeenCalledTimes(1);
      expect(mockBookmarkMutate).toHaveBeenLastCalledWith(
        expect.objectContaining({
          payload: {
            mainTitle: '사람',
            namings: [{ name: '김민지', description: '테스트 설명 1' }],
          },
        }),
        expect.objectContaining({
          onSuccess: expect.any(Function),
        }),
      );
    });

    // 북마크 해제
    fireEvent.click(screen.getAllByAltText('북마크')[1]);

    await waitFor(() => {
      expect(mockUnBookmarkMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: { id: 1 },
        }),
        expect.objectContaining({
          onSuccess: expect.any(Function),
        }),
      );
    });
  });

  test('navigates back when back button is clicked', () => {
    render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(aiNamingState, {
            naming: [
              { name: '김민지', hanja: '', description: '테스트 설명 1', bookmarked: false },
              { name: '이서연', hanja: '', description: '테스트 설명 2', bookmarked: true },
            ],
          });
        }}
      >
        <MemoryRouter>
          <NamingResult />
        </MemoryRouter>
      </RecoilRoot>,
    );

    const backButton = screen.getByAltText('back-icon');
    fireEvent.click(backButton);

    // mockNavigate가 -1로 호출되었는지 확인
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
