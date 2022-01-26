export const getStoredValues = (key: string) => {
	const storedValues = localStorage.getItem(key);
	if (!storedValues) return '';
	return JSON.parse(storedValues);
};
