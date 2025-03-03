import { makeRedirectUri } from "expo-auth-session";

export const Spotify = {
  url: {
    apiV1Endpoint: "https://api.spotify.com/v1",
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  },
  env: {
    clientId: process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID ?? "",
    redirectUri: makeRedirectUri({
      path: process.env.EXPO_PUBLIC_SPOTIFY_REDIRECT_URI ?? "",
    }),
  },
};
