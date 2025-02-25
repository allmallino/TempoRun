import { Platform, PlaylistType, TrackType } from "@/state/playlists/types";
import { playlistInfoType, trackInfoType } from "@/types/spotifyAPI";
import { SpotifyAPI_v1 } from "@/constants/API";

export async function getSpotifyUserProfile(accessToken: string) {
  try {
    const response = await fetch(`${SpotifyAPI_v1}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userInfo = await response.json();

    return {
      id: userInfo.id,
      info: {
        platform: Platform.SPOTIFY,
        name: userInfo.display_name,
        profileImage: userInfo.images[0].url,
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
    const response = await fetch(`${SpotifyAPI_v1}/me/playlists`, {
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
          platform: Platform.SPOTIFY,
          imageUrl: playlistInfo.images[0].url,
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
      `${SpotifyAPI_v1}/playlists/${paylistId}/tracks?fields=items%28track%28id%29%29`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const playlistsTracks = (await response.json()).items;

    return playlistsTracks.map((trackInfo: { track: { id: number } }) => {
      return {
        id: trackInfo.track.id,
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
    const response = await fetch(`${SpotifyAPI_v1}/tracks/${trackId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const trackInfo: trackInfoType = await response.json();

    return {
      id: trackId,
      info: {
        name: trackInfo.name,
        artist: trackInfo.artists.map((v) => v.name).join(`, `),
        imageUrl: trackInfo.album.images[0].url,
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
    const response = await fetch(`${SpotifyAPI_v1}/tracks?ids=${ids}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const tracksInfo: Array<trackInfoType> = (await response.json()).tracks;

    return tracksInfo.map((trackInfo) => ({
      id: trackInfo.id,
      info: {
        name: trackInfo.name,
        artist: trackInfo.artists.map((v) => v.name).join(`, `),
        imageUrl: trackInfo.album.images[0].url,
      },
    }));
  } catch (error) {
    console.error("Failed to fetch track info:", error);
    return null;
  }
}
