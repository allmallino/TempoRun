import { MusicTempo } from "../mode/types";

export type TrackType = {
  id: string;
  info: TrackInfoType;
};

export type TrackInfoType = {
  name: string;
  artist: string;
  imageUrl: string;
  tempo: MusicTempo;
};
