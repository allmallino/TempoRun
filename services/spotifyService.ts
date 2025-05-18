import { PlaylistType, TrackType } from "@/state/playlists/types";
import {
  deviceInfoType,
  DeviceType,
  playlistInfoType,
  playlistTrackInfo,
  trackInfoType,
} from "@/types/spotifyAPI";
import { Spotify } from "@/constants/API";
import { Images } from "@/constants/Images";
import { StreamingServiceCredentialsType } from "@/state/streaming/types";
import { refreshAsync } from "expo-auth-session";

export async function getSpotifyUserProfile(accessToken: string) {
  try {
    const response = await fetch(`${Spotify.url.apiV1Endpoint}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userInfo = await response.json();

    return {
      id: userInfo.id as string,
      info: {
        name: userInfo.display_name as string,
        profileImage: (userInfo.images[0]
          ? userInfo.images[0].url
          : Images.notFound.image) as string,
      },
    };
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    return null;
  }
}

export async function getSpotifyUserPlaylists(
  accessToken: string,
  userId: string
): Promise<PlaylistType[] | null> {
  try {
    const response = await fetch(`${Spotify.url.apiV1Endpoint}/me/playlists`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const playlistsInfo = (await response.json()).items;

    return playlistsInfo.map((playlistInfo: playlistInfoType) => {
      return {
        id: playlistInfo.id,
        streamingServiceId: userId,
        info: {
          name: playlistInfo.name,
          imageUrl: playlistInfo.images[0]
            ? playlistInfo.images[0].url
            : Images.notFound.image,
        },
        active: false,
        imported: false,
      };
    });
  } catch (error) {
    console.error("Failed to fetch user playlists:", error);
    return null;
  }
}

export async function getSpotifyPlaylistTracks(
  accessToken: string,
  paylistId: string
): Promise<TrackType[] | null> {
  try {
    const response = await fetch(
      `${Spotify.url.apiV1Endpoint}/playlists/${paylistId}/tracks?fields=items%28track%28id%2Cduration_ms%29%29`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const playlistsTracks: Array<playlistTrackInfo> = (await response.json())
      .items;

    return playlistsTracks
      .filter(({ track }) => track.duration_ms > 0)
      .map(({ track }) => {
        return {
          id: track.id,
          active: true,
        };
      });
  } catch (error) {
    console.error("Failed to fetch playlist's tracks:", error);
    return null;
  }
}

export async function getSpotifyTrackInfo(
  accessToken: string,
  trackId: string
) {
  try {
    const response = await fetch(
      `${Spotify.url.apiV1Endpoint}/tracks/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const trackInfo: trackInfoType = await response.json();

    return {
      id: trackId,
      info: {
        name: trackInfo.name,
        artist: trackInfo.artists.map((v) => v.name).join(`, `),
        imageUrl: trackInfo.album.images[0]
          ? trackInfo.album.images[0].url
          : Images.notFound.image,
      },
    };
  } catch (error) {
    console.error("Failed to fetch track info:", error);
    return null;
  }
}

export async function getSpotifyTracksInfo(
  accessToken: string,
  trackIds: Array<string>
) {
  try {
    const ids = trackIds.join(`,`);
    const response = await fetch(
      `${Spotify.url.apiV1Endpoint}/tracks?ids=${ids}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const tracksInfo: Array<trackInfoType> = (await response.json()).tracks;
    return tracksInfo.map((trackInfo) => ({
      id: trackInfo.id,
      info: {
        name: trackInfo.name,
        artist: trackInfo.artists.map((v) => v.name).join(`, `),
        imageUrl: trackInfo.album.images[0]
          ? trackInfo.album.images[0].url
          : Images.notFound.image,
      },
    }));
  } catch (error) {
    console.error("Failed to fetch track info:", error);
    return null;
  }
}

export async function getRefreshedToken(refreshToken: string) {
  try {
    const tokenResult = await refreshAsync(
      {
        clientId: Spotify.env.clientId,
        refreshToken: refreshToken,
      },
      {
        tokenEndpoint: Spotify.url.tokenEndpoint,
      }
    );
    return {
      accessToken: tokenResult.accessToken,
      expiresIn: tokenResult.expiresIn ?? 3600,
      issuedAt: tokenResult.issuedAt,
      refreshToken: tokenResult.refreshToken ?? refreshToken,
    };
  } catch (error) {
    console.error("Failed to refresh user token:", error);
    throw error;
  }
}

export async function getValidSpotifyToken(
  credentials: StreamingServiceCredentialsType
): Promise<StreamingServiceCredentialsType> {
  const { refreshToken, expiresIn, issuedAt } = credentials;

  const lastRefreshedDate = new Date(issuedAt);
  const now = Date.now() / 1000;
  if (now - lastRefreshedDate.getTime() > expiresIn - 600) {
    const newCreds = await getRefreshedToken(refreshToken);
    return {
      ...credentials,
      ...newCreds,
    };
  }

  return credentials;
}

export async function getAvailableDevices(
  accessToken: string
): Promise<deviceInfoType[] | null> {
  try {
    const response = await fetch(
      `${Spotify.url.apiV1Endpoint}/me/player/devices`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch devices: ${response.status}`);
    }

    const { devices = [] } = await response.json();
    return devices.filter(
      (device: deviceInfoType) => device.type === DeviceType.Smartphone
    );
  } catch (error) {
    console.error("Failed to get available devices:", error);
    return null;
  }
}

export async function setPlayback(
  accessToken: string,
  trackIds: Array<string>,
  position = 0,
  positionMs = 0
) {
  try {
    const devices = await getAvailableDevices(accessToken);
    const deviceId = devices?.[0]?.id;
    if (!deviceId) {
      throw new Error("No device found");
    }

    const playbackOptions = {
      uris: trackIds.map((id) => `spotify:track:${id}`),
      offset: { position },
      position_ms: positionMs,
    };

    const response = await fetch(
      `${Spotify.url.apiV1Endpoint}/me/player/play?device_id=${deviceId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(playbackOptions),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    return true;
  } catch (error) {
    console.error("Failed to start playback:", error);
    return null;
  }
}

export async function pausePlayback(
  accessToken: string
): Promise<boolean | null> {
  try {
    const devices = await getAvailableDevices(accessToken);
    const deviceId = devices?.[0]?.id;
    if (!deviceId) {
      throw new Error("No device found");
    }

    const response = await fetch(
      `${Spotify.url.apiV1Endpoint}/me/player/pause?device_id=${deviceId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    return true;
  } catch (error) {
    console.error("Failed to pause playback:", error);
    return null;
  }
}
