export const secondsToDuration = (duration: number | string) => {
  const sec_num = parseInt(duration + '', 10);
  const hours = Math.floor(sec_num / 3600);
  const minutes = Math.floor((sec_num - hours * 3600) / 60);
  const seconds = sec_num - hours * 3600 - minutes * 60;

  let res = '';

  if (hours > 0) res += hours + 'h ';
  if (minutes > 0) res += minutes + 'm ';
  res += seconds + 's';

  return res;
};
