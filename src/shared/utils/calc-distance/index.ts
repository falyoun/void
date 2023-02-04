type Loc = { lat: number; lon: number };
export const calcDistance = (
  { lat: lat1, lon: lon1 }: Loc,
  { lat: lat2, lon: lon2 }: Loc,
) => {
  const rLat1 = (lat1 * Math.PI) / 180,
    rLat2 = (lat2 * Math.PI) / 180,
    dLon = ((lon2 - lon1) * Math.PI) / 180,
    R = 6371e3;
  return (
    Math.acos(
      Math.sin(rLat1) * Math.sin(rLat2) +
        Math.cos(rLat1) * Math.cos(rLat2) * Math.cos(dLon),
    ) * R
  );
};
