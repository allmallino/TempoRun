import { getSpotifyUserPlaylists, getSpotifyUserProfile } from "@/helpers";
import { updatePlaylists } from "@/state/playlists/playlistSlice";
import { addStreamingService } from "@/state/streaming/streamingSlice";
import {
  exchangeCodeAsync,
  makeRedirectUri,
  useAuthRequest,
} from "expo-auth-session";
import { maybeCompleteAuthSession } from "expo-web-browser";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const clientId = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID ?? "";
const redirectUri = makeRedirectUri({
  path: process.env.EXPO_PUBLIC_SPOTIFY_REDIRECT_URI ?? "",
});

maybeCompleteAuthSession();

export default function useSpotifyAuth() {
  const dispatch = useDispatch();
  const [error, setError] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId,
      scopes: ["user-read-private", "playlist-read-private"],
      usePKCE: true,
      redirectUri,
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
          const tokenResult = await exchangeCodeAsync(
            {
              code,
              clientId,
              redirectUri,
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
              accessToken: tokenResult.accessToken,
              systemInfo: {
                expiresIn: tokenResult.expiresIn ?? 3600,
                issuedAt: tokenResult.issuedAt,
                refreshToken: tokenResult.refreshToken ?? "",
              },
            })
          );

          const playlists = await getSpotifyUserPlaylists(
            tokenResult.accessToken,
            userInfo?.id
          );
          dispatch(updatePlaylists(playlists));
          setIsAuthenticated(true);
        } catch (e) {
          setError(e);
        }
      }
    }
    if (!isAuthenticated) {
      updateFromAuthResponseAsync();
    }
  }, [response]);

  return [error, isAuthenticated, () => promptAsync()];
}
