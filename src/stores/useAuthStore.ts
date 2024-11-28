import { UserResponse } from '@/types/userType';
import { atom, selector } from 'recoil';

// 상태 관리 (isAuthenticated)
export const authState = atom<boolean>({
	key: 'authState', // 고유 키
	default: false, // 초기값
});

// 인증 상태를 설정하는 선택자 (선택적)
export const authSelector = selector({
	key: 'authSelector',
	get: ({ get }) => get(authState), // 현재 상태 반환
	set: ({ set }, newValue) => {
		if (typeof newValue === 'boolean') {
			set(authState, newValue); // 새로운 상태 설정
		}
	},
});

// 로그인 유저
export const userState = atom<UserResponse | null>({
	key: 'userState',
	default: null,
});
