import { PlatformType } from "../playlists/types";

export type StreamingServiceType = {
  id: string;
  info: StreamingServiceInfoType;
  accessToken: string;
  systemInfo?: StreamingServiceSystemInfoType;
};

export type StreamingServiceInfoType = {
  name: string;
  platform: PlatformType;
  profileImage: string;
};

export type StreamingServiceSystemInfoType = {
  expiresIn: number;
  issuedAt: number;
  refreshToken: string;
};
