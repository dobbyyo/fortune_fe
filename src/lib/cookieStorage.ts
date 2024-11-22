import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const getCookie = (name: string): string | undefined => {
	console.log('Cookie:', cookies.get(name));
	return cookies.get(name);
};
