import { ModeType } from "@/state/mode/types";
import { StreamingServiceCredentialsType } from "@/state/streaming/types";

type PlaylistType = {
  active: boolean;
  id: string;
  streamingServiceId: string;
};

export type UserPlaylistsType =
  | {
      playlists: Array<PlaylistType>;
    }
  | undefined;

export type UserModeType = ModeType | undefined;

export type UserStreamingType = StreamingServiceCredentialsType | undefined;
