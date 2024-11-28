import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const getCookie = (name: string): string | undefined => {
	return cookies.get(name);
};
