export const memoryConverter = (number: number): string => {
  return (number / 10 ** 9).toFixed(2);
};
