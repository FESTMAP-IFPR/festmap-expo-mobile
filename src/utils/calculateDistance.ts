import { getDistance } from "geolib";

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const distance = getDistance(
    { latitude: lat1, longitude: lon1 },
    { latitude: lat2, longitude: lon2 }
  );

  return Number((distance / 1000).toFixed(1));
};

export default calculateDistance;
