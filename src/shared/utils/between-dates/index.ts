type DurationType = 'h' | 'm' | 's' | 'ms';

const mul: Record<DurationType, number> = {
  h: 60 * 60 * 1000,
  m: 60 * 1000,
  s: 1000,
  ms: 1,
};

export const betweenDates = (
  from: Date | string | number,
  to: Date | string | number,
  m: DurationType = 's',
) => (new Date(from).getTime() - new Date(to).getTime()) / mul[m];
