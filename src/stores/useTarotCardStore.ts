import { TarotCard } from '@/types/tarotType';
import { atom, selector } from 'recoil';

// 활성 탭 상태
export const tabState = atom<string>({
  key: 'tabState',
  default: '오늘의 타로',
});

// 탭별 카테고리 데이터
export const tabCategoriesState = selector({
  key: 'tabCategoriesState',
  get: ({ get }) => {
    const currentTab = get(tabState);
    const categories: { [key: string]: string[] } = {
      '오늘의 타로': ['애정운', '재물운', '학업&취업운'],
      '이달의 타로': ['총운', '행운', '주의', '사건', '처세술'],
      '연애 타로': ['연애운'],
      '취업 타로': ['취업운'],
    };
    return categories[currentTab] || [];
  },
});

// 동적으로 기본값 생성하는 selector
export const selectedCardsDefault = selector({
  key: 'selectedCardsDefault',
  get: ({ get }) => {
    const currentTab = get(tabState); // 현재 탭
    console.log('asd', currentTab);
    if (currentTab === '오늘의 타로') return [null, null, null]; // 애정운, 재물운, 학업운
    if (currentTab === '이달의 타로') return [null, null, null, null, null]; // 총운, 행운, 주의, 사건, 처세술
    if (currentTab === '연애 타로') return [null]; // 연애운
    if (currentTab === '취업 타로') return [null]; // 취업운
    return [];
  },
});

// 선택된 카드 상태
export const selectedCardsState = atom<(number | null)[]>({
  key: 'selectedCardsState',
  default: selectedCardsDefault,
});

// 드래그 위치 상태
export const dragPositionState = atom<number>({
  key: 'dragPositionState',
  default: 0,
});

// 슬라이더의 현재 인덱스
export const sliderIndexState = atom<number>({
  key: 'sliderIndexState',
  default: 0,
});

// 리셋 트리거 상태
export const resetTriggerState = atom<boolean>({
  key: 'resetTriggerState',
  default: false,
});

// 타로카드 해석
export const tarotCardsState = atom<TarotCard[]>({
  key: 'tarotCardsState',
  default: [], // 초기값은 빈 배열
});

// 북마크 상태
export const TarotBookmarkState = atom<boolean>({
  key: 'bookmarkState',
  default: false,
});
