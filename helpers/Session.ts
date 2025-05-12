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
  const seconds = pace % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export const formatDistance = (distance: number) => {
  const kilometers = Math.floor(distance / 1000);
  const meters = Math.round((distance % 1000) / 10);
  return `${kilometers}.${meters.toString().padStart(2, "0")}`;
};
