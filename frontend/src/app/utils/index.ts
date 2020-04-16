export const memoryConverter = (number: number): string => {
  return (number / 10 ** 9).toFixed(2);
};

export const setDefault = (current: number, fixed: number): number => {
  return current ? current : fixed;
};
