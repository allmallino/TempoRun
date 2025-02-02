import { PlatformType } from "../playlists/types";

export type StreamingServiceType = {
  id: number;
  info: StreamingServiceInfoType;
};

export type StreamingServiceInfoType = {
  name: string;
  platform: PlatformType;
  profileImage: string;
};
