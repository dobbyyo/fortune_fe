export const cleanData = (data: any) => {
	// 문자열인 경우 바로 처리
	if (typeof data === 'string') {
		return data.replace(/["']/g, '');
	}

	// 객체나 배열인 경우 JSON 처리
	return JSON.parse(JSON.stringify(data).replace(/["']/g, ''));
};
