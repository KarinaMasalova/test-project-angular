export const roundNumber = (num: number, decimalPlaces: number): number => {
  const factorOfTen = 10 ** decimalPlaces;
  return Math.round(num * factorOfTen) / factorOfTen;
};
