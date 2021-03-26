export const convertTimeStamp = (value: number) => {
  const date = new Date(value * 1000);
  return date.toDateString();
}
