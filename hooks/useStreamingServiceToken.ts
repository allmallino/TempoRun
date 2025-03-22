import { useDispatch, useSelector } from "react-redux";
import { updateStreamingCredentials } from "@/state/streaming/streamingSlice";
import { getValidSpotifyToken } from "@/services/spotifyService";
import { getStreamingServiceCredetials } from "@/state/streaming/selectors";

export function useStreamingServiceToken() {
  const dispatch = useDispatch();
  const credentials = useSelector(getStreamingServiceCredetials);

  async function getToken() {
    try {
      if (credentials) {
        const updatedCredentials = await getValidSpotifyToken(credentials);

        if (
          updatedCredentials &&
          updatedCredentials.accessToken !== credentials.accessToken
        ) {
          dispatch(updateStreamingCredentials(updatedCredentials));
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
