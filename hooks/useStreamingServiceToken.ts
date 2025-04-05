import { useDispatch, useSelector } from "react-redux";
import { updateStreamingCredentialsAsync } from "@/state/streaming/streamingSlice";
import { getValidSpotifyToken } from "@/services/spotifyService";
import { getStreamingServiceCredetials } from "@/state/streaming/selectors";
import { AppDispatch } from "@/state/store";
import { getUserUId } from "@/state/user/selectors";

export function useStreamingServiceToken() {
  const dispatch = useDispatch<AppDispatch>();
  const credentials = useSelector(getStreamingServiceCredetials);
  const userId = useSelector(getUserUId);

  async function getToken() {
    try {
      if (credentials) {
        const updatedCredentials = await getValidSpotifyToken(credentials);

        if (
          updatedCredentials.accessToken !== credentials.accessToken &&
          userId
        ) {
          dispatch(
            updateStreamingCredentialsAsync({
              userId,
              credentials: updatedCredentials,
            })
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
