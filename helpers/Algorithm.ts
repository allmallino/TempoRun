import { Mode, ModeOptionType, MusicTempo } from "@/state/mode/types";
import { SessionData } from "@/contexts/SessionContext";

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

export const convertDictionary: Record<Mode, ConvertFunction> = {
  [Mode.PACE]: () => null, // TODO: Implement
  [Mode.MAP]: () => null, // TODO: Implement
  [Mode.LENGTH]: convertLength,
  [Mode.TIMER]: convertTimer,
};
