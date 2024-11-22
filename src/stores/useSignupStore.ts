import { atom } from 'recoil';

export const agreementsState = atom({
	key: 'agreementsState',
	default: {
		allChecked: false,
		termsOfService: false,
		privacyPolicy: false,
		marketingInfo: false,
	},
});

export const formDataState = atom({
	key: 'formDataState',
	default: {
		avatar: '',
		email: '',
		username: '',
		gender: '',
		birthDate: '',
		birthTime: '',
	},
});
