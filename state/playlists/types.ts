export type PlatformType = "Spotify" | "Apple Music" | "YouTube Music";

export enum Platform {
  SPOTIFY = "Spotify",
  APPLE_MUSIC = "Apple Music",
  YOUTUBE_MUSIC = "YouTube Music",
}

export type PlaylistType = {
  id: string;
  streamingServiceId: string;
  info: PlaylistInfoType;
  active: boolean;
  imported: boolean;
  tracks?: TrackType[];
};

export type PlaylistInfoType = {
  name: string;
  imageUrl: string;
};

export type TrackType = {
  id: string;
  active: boolean;
};
