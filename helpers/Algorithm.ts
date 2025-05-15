import { Mode, ModeOptionType, MusicTempo } from "@/state/mode/types";
import { SessionData } from "@/contexts/SessionContext";
import { calculateDistance } from "./Session";

const RADIUS_METERS = 100;

type ConvertFunction = (
  data: SessionData,
  option: ModeOptionType
) => MusicTempo | null;

const convertLength: ConvertFunction = (data, option) => {
  const distance = data.distance;
  const optionDistance = parseFloat(option.indicator) * 1000;

  return distance >= optionDistance ? option.musicTempo : null;
};

const convertTimer: ConvertFunction = (data, option) => {
  const time = (Date.now() - data.startTime) / 1000;
  const [minutes, seconds] = option.indicator.split(":").map(Number);
  const optionTime = minutes * 60 + seconds;

  return time >= optionTime ? option.musicTempo : null;
};

const convertPosition: ConvertFunction = (data, option) => {
  const [latitude, longitude] = option.indicator.split(",").map(parseFloat);
  const optionPosition = { latitude, longitude };

  const isDefaultPosition = latitude === 0 && longitude === 0;
  if (isDefaultPosition) return option.musicTempo;

  if (!data.lastLocation) return null;

  const currentPosition = {
    latitude: data.lastLocation.coords.latitude,
    longitude: data.lastLocation.coords.longitude,
  };

  const distanceToTarget = calculateDistance(currentPosition, optionPosition);

  return distanceToTarget <= RADIUS_METERS ? option.musicTempo : null;
};

const convertPace: ConvertFunction = (data) => {
  const pace = data.pace;
  if (!pace) return MusicTempo.MEDIUM;

  if (pace < 5 * 60) return MusicTempo.HIGH;
  else if (pace < 6 * 60) return MusicTempo.MEDIUM;
  else return MusicTempo.LOW;
};

export const convertDictionary: Record<Mode, ConvertFunction> = {
  [Mode.PACE]: convertPace,
  [Mode.MAP]: convertPosition,
  [Mode.LENGTH]: convertLength,
  [Mode.TIMER]: convertTimer,
};
