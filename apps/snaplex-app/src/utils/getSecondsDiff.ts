export const getSecondsDiff = (startDate: number, endDate: number): number => {
  const msInSecond = 60 * 60 * 1000;

  return Math.round(
    Math.abs(endDate - startDate) / msInSecond
  );
}
