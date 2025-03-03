import { useDispatch, useSelector } from "react-redux";
import { updateStreamingCredentials } from "@/state/streaming/streamingSlice";
import { getValidSpotifyToken } from "@/services/spotifyService";
import {
  getStreamingServiceCredetialsById,
  getStreamingServiceInfoById,
} from "@/state/streaming/selectors";
import { Platform } from "@/state/playlists/types";
import { StreamingServiceCredentialsType } from "@/state/streaming/types";

const getValidToken: Record<
  Platform,
  (
    credentials: StreamingServiceCredentialsType
  ) => Promise<StreamingServiceCredentialsType> | null
> = {
  [Platform.SPOTIFY]: getValidSpotifyToken,
  [Platform.APPLE_MUSIC]: () => null,
  [Platform.YOUTUBE_MUSIC]: () => null,
};

export function useStreamingServiceToken(id: string) {
  const dispatch = useDispatch();
  const credentials = useSelector(getStreamingServiceCredetialsById(id));
  const info = useSelector(getStreamingServiceInfoById(id));

  async function getToken() {
    try {
      if (credentials && info) {
        const updatedCredentials = await getValidToken[info.platform](
          credentials
        );

        if (
          updatedCredentials &&
          updatedCredentials.accessToken !== credentials.accessToken
        ) {
          dispatch(
            updateStreamingCredentials({ id, credentials: updatedCredentials })
          );
        }

        return updatedCredentials ? updatedCredentials.accessToken : null;
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  return { getToken };
}
