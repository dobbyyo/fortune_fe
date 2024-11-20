import { atom, selector } from 'recoil';

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
