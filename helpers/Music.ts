import { MusicTempo } from "@/state/mode/types";

export const getTempo = (tempo: number): MusicTempo => {
  if (tempo <= 100) return MusicTempo.LOW;
  if (tempo <= 130) return MusicTempo.MEDIUM;
  return MusicTempo.HIGH;
};
