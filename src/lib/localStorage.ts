export const getLocalStorage = (key: string) => {
	try {
		const storedData = localStorage.getItem(key);
		return storedData ? JSON.parse(storedData) : null;
	} catch (error) {
		console.error(`Error getting localStorage key "${key}":`, error);
		return null;
	}
};

export const setLocalStorage = (key: string, value: any) => {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		console.error(`Error setting localStorage key "${key}":`, error);
	}
};

export const removeLocalStorage = (key: string) => {
	try {
		localStorage.removeItem(key);
	} catch (error) {
		console.error(`Error removing localStorage key "${key}":`, error);
	}
};
