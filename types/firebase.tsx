import { ModeType } from "@/state/mode/types";
import { TrackType } from "@/state/playlists/types";
import { StreamingServiceCredentialsType } from "@/state/streaming/types";

type PlaylistType = {
  active: boolean;
  id: string;
  streamingServiceId: string;
  tracks?: Array<TrackType>;
};

export type UserPlaylistsType =
  | {
      playlists: Array<PlaylistType>;
    }
  | undefined;

export type UserModeType = ModeType | undefined;

export type UserStreamingType = StreamingServiceCredentialsType | undefined;
