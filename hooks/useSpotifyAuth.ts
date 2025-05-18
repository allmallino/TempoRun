import { Spotify } from "@/constants/API";
import {
  getSpotifyUserPlaylists,
  getSpotifyUserProfile,
} from "@/services/spotifyService";
import { setLoaderVisibility } from "@/state/loader/loaderSlice";
import { updatePlaylists } from "@/state/playlists/playlistSlice";
import { AppDispatch } from "@/state/store";
import { getStreamingServiceStatus } from "@/state/streaming/selectors";
import { setStreamingServiceAsync } from "@/state/streaming/streamingSlice";
import { getUserUId } from "@/state/user/selectors";
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
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<any | null>(null);
  const isAuthenticated = useSelector(getStreamingServiceStatus);
  const userId = useSelector(getUserUId);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: Spotify.env.clientId,
      scopes: [
        "user-read-private",
        "playlist-read-private",
        "user-modify-playback-state",
        "user-read-playback-state",
      ],
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
          if (userInfo && userId) {
            const service = {
              ...userInfo,
              credentials: {
                accessToken: tokenResult.accessToken,
                expiresIn: tokenResult.expiresIn ?? 3600,
                issuedAt: tokenResult.issuedAt,
                refreshToken: tokenResult.refreshToken ?? "",
              },
            };
            dispatch(
              setStreamingServiceAsync({
                userId,
                service,
              })
            );
            const playlists = await getSpotifyUserPlaylists(
              tokenResult.accessToken,
              userInfo?.id ?? ""
            );
            dispatch(updatePlaylists(playlists));
          } else {
            throw Error("Failed to get user profile info.");
          }
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
