export const metersToDistance = (distance: number | string) => {
  const baseMeters = Math.round(parseInt(distance + '', 10));
  const km = Math.floor(baseMeters / 1000);
  const meters = baseMeters - km * 1000;

  let res = '';

  if (km > 0) res += km + 'km ';
  res += meters + 'm';

  return res;
};
