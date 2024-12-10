import { atom, selector } from 'recoil';

// 타로 탭
export const tabState = atom<string>({
  key: 'tabState',
  default: '오늘의 타로',
});

export const tabSelector = selector({
  key: 'tabSelector',
  get: ({ get }) => get(tabState),
  set: ({ set }, newValue) => {
    if (typeof newValue === 'string' && newValue.includes('타로')) {
      set(tabState, newValue);
    }
  },
});

// 작명 탭
export const namingTabState = atom<{
  name: string;
  key: string;
}>({
  key: 'namingTabState',
  default: { name: 'AI 작명', key: 'aiNaming' },
});

export const namingTabSelector = selector({
  key: 'namingTabSelector',
  get: ({ get }) => get(namingTabState),
  set: ({ set }, newValue) => {
    if (typeof newValue === 'object' && newValue !== null && 'name' in newValue && newValue.name.includes('작명')) {
      set(namingTabState, newValue);
    }
  },
});
