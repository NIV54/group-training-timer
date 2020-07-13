export const formatTimeUnit = (value: number) =>
  value < 10 ? `0${value}` : value.toString();
