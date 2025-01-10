export type PlaylistType = {
  id: number;
  info: PlaylistInfoType;
  active: boolean;
  imported: boolean;
  tracks?: TrackType[];
};

export type PlaylistInfoType = {
  name: string;
  platform: "Spotify" | "Apple Music" | "YouTube Music";
};

export type TrackType = {
  id: number;
  info: TrackInfoType;
  active: boolean;
};

export type TrackInfoType = {
  name: string;
  artist: string;
};
