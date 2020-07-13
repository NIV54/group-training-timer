/**
 * converts time to ms
 * @param time format - 00:00
 */
export const convertTime = (time: string) =>
  (+time.slice(0, 2) * 60 + +time.slice(3, 5)) * 1000;
