export const formatDate = (timestamp) => {
  const year = timestamp.slice(0, 4);
  const month = timestamp.slice(4, 6) - 1;
  const day = timestamp.slice(6, 8);
  const hour = timestamp.slice(9, 11);
  const minute = timestamp.slice(11, 13);
  const second = timestamp.slice(13, 15);

  const date = new Date(year, month, day, hour, minute, second);

  return date.toLocaleString();
};