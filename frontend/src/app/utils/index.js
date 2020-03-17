export const memoryConverter = number => (number / 10 ** 9).toFixed(2);

export const setDefault = (current, fixed) => (current ? current : fixed);
