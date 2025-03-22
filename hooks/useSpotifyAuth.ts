import { Spotify } from "@/constants/API";
import {
  getSpotifyUserPlaylists,
  getSpotifyUserProfile,
} from "@/services/spotifyService";
import { setLoaderVisibility } from "@/state/loader/loaderSlice";
import { updatePlaylists } from "@/state/playlists/playlistSlice";
import { getStreamingServiceStatus } from "@/state/streaming/selectors";
import { addStreamingService } from "@/state/streaming/streamingSlice";
import { exchangeCodeAsync, useAuthRequest } from "expo-auth-session";
import { maybeCompleteAuthSession } from "expo-web-browser";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const discovery = {
  authorizationEndpoint: Spotify.url.authorizationEndpoint,
  tokenEndpoint: Spotify.url.tokenEndpoint,
};

maybeCompleteAuthSession();

export default function useSpotifyAuth() {
  const dispatch = useDispatch();
  const [error, setError] = useState<any | null>(null);
  const isAuthenticated = useSelector(getStreamingServiceStatus);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: Spotify.env.clientId,
      scopes: ["user-read-private", "playlist-read-private"],
      usePKCE: true,
      redirectUri: Spotify.env.redirectUri,
      extraParams: {
        show_dialog: "true",
      },
    },
    discovery
  );

  useEffect(() => {
    async function updateFromAuthResponseAsync() {
      if (response === null) {
        return;
      } else if (response.type === "error") {
        setError(response.error);
        return;
      } else if (response.type === "success" && !!request?.codeVerifier) {
        const { code } = response.params;
        try {
          dispatch(setLoaderVisibility(true));
          const tokenResult = await exchangeCodeAsync(
            {
              code,
              clientId: Spotify.env.clientId,
              redirectUri: Spotify.env.redirectUri,
              extraParams: {
                code_verifier: request.codeVerifier ?? "",
              },
            },
            { tokenEndpoint: discovery.tokenEndpoint }
          );

          const userInfo = await getSpotifyUserProfile(tokenResult.accessToken);

          dispatch(
            addStreamingService({
              ...userInfo,
              credentials: {
                accessToken: tokenResult.accessToken,
                expiresIn: tokenResult.expiresIn ?? 3600,
                issuedAt: tokenResult.issuedAt,
                refreshToken: tokenResult.refreshToken ?? "",
              },
            })
          );

          const playlists = await getSpotifyUserPlaylists(
            tokenResult.accessToken,
            userInfo?.id ?? ""
          );
          dispatch(updatePlaylists(playlists));
        } catch (e) {
          setError(e);
        } finally {
          dispatch(setLoaderVisibility(false));
        }
      }
    }
    if (!isAuthenticated) {
      updateFromAuthResponseAsync();
    }
  }, [response]);

  return [error, isAuthenticated, () => promptAsync()];
}
