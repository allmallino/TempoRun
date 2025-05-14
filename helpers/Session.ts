import { LocationObject } from "expo-location";

export const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600).toString();
  const minutes = Math.floor((time % 3600) / 60).toString();
  const seconds = Math.floor(time % 60).toString();
  return `${hours.padStart(1, "0")}:${minutes.padStart(
    2,
    "0"
  )}:${seconds.padStart(2, "0")}`;
};

export const formatPace = (pace: number) => {
  const minutes = Math.floor(pace / 60);
  const seconds = Math.floor(pace % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export const formatDistance = (distance: number) => {
  const kilometers = Math.floor(distance / 1000);
  const meters = Math.round((distance % 1000) / 10);
  return `${kilometers}.${meters.toString().padStart(2, "0")}`;
};

export const calculateDistance = (
  loc1: LocationObject,
  loc2: LocationObject
) => {
  if (!loc1.coords || !loc2.coords) return 0;

  const R = 6371e3;
  const φ1 = (loc1.coords.latitude * Math.PI) / 180;
  const φ2 = (loc2.coords.latitude * Math.PI) / 180;
  const Δφ = ((loc2.coords.latitude - loc1.coords.latitude) * Math.PI) / 180;
  const Δλ = ((loc2.coords.longitude - loc1.coords.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export const calculatePace = (distance: number, timeElapsed: number) => {
  if (distance === 0 || timeElapsed === 0) return 0;
  return timeElapsed / distance;
};

export const calculateAveragePace = (paces: number[]) => {
  if (paces.length === 0) return 0;
  const validPaces = paces.filter((pace) => pace > 0);
  if (validPaces.length === 0) return 0;
  return validPaces.reduce((sum, pace) => sum + pace, 0) / validPaces.length;
};
