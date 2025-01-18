export type PlatformType = "Spotify" | "Apple Music" | "YouTube Music";

export type PlaylistType = {
  id: number;
  info: PlaylistInfoType;
  active: boolean;
  imported: boolean;
  tracks: TrackType[];
};

export type PlaylistInfoType = {
  name: string;
  platform: PlatformType;
};

export type TrackType = {
  id: number;
  active: boolean;
};
