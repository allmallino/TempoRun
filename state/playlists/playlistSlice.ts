import { createAsyncThunk, createSlice, Reducer } from "@reduxjs/toolkit";
import { PlaylistType, TrackType } from "./types";
import { revertAll } from "../actions";
import {
  addUserPlaylistInfo,
  addUserPlaylistTracks,
  getUserPlaylistInfo,
  initUserPlaylistInfo,
  removeUserPlaylistInfo,
  removeUserPlaylistTracks,
  setUserPlaylistActive,
  toggleUserPlaylistTrackActive,
} from "@/services/firestoreService";
import {
  getSpotifyPlaylistTracks,
  getSpotifyTracksInfo,
  getSpotifyUserPlaylists,
} from "@/services/spotifyService";
import { getStreamingServiceCredetials } from "../streaming/selectors";
import { RootState } from "../store";
import { getUserUId } from "../user/selectors";
import { getActivatedPlaylist, getPlaylistById } from "./selectors";
import { updateTracks } from "../tracks/trackSlice";
import { getTrackAnalysisFeatures } from "@/services/soundstatService";
import { getTempo } from "@/helpers";
import { MusicTempo } from "../mode/types";

interface playlistState {
  value: PlaylistType[];
}

const initialState: playlistState = {
  value: [],
};

const playlistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    updatePlaylists: (state, action) => {
      const incoming = action.payload;
      incoming.forEach((newPlaylist: PlaylistType) => {
        const existingIndex = state.value.findIndex(
          (oldPlaylist) => oldPlaylist.id === newPlaylist.id
        );
        if (existingIndex >= 0) {
          state.value[existingIndex] = newPlaylist;
        } else {
          state.value.push(newPlaylist);
        }
      });
    },
    updatePlaylistTracks: (state, action) => {
      const incoming = action.payload;
      const index = state.value.findIndex(
        (playlist) => playlist.id === incoming.id
      );
      if (index >= 0) {
        state.value[index].tracks = incoming.tracks;
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(revertAll, () => initialState)
      .addCase(initPlaylistsStateAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.value = action.payload;
        }
      })
      .addCase(toggleImportedAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.value = state.value.map((playlist) => {
            if (playlist.id === action.payload) {
              return {
                ...playlist,
                imported: !playlist.imported,
                active: false,
              };
            }
            return playlist;
          });
        }
      })
      .addCase(toggleActiveAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.value = state.value.map((playlist) => {
            if (playlist.id === action.payload) {
              return { ...playlist, active: !playlist.active };
            } else if (playlist.active) {
              return { ...playlist, active: false };
            }
            return playlist;
          });
        }
      })
      .addCase(toggleTrackActiveAsync.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.value.findIndex(
            (playlist) => playlist.id === action.payload.playlistId
          );
          if (index >= 0 && state.value[index].tracks) {
            const trackIndex = state.value[index].tracks.findIndex(
              (track) => track.id === action.payload.trackId
            );
            if (trackIndex >= 0) {
              const track = state.value[index].tracks[trackIndex];
              track.active = !track.active;
            }
          }
        }
      }),
});

export const { updatePlaylists, updatePlaylistTracks } = playlistSlice.actions;

export const initPlaylistsStateAsync = createAsyncThunk(
  "playlists/initPlaylistsStateAsync",
  async (userId: string, { getState, dispatch }) => {
    const state = getState() as RootState;
    const playlistInfo = await getUserPlaylistInfo(userId);
    const accessToken = getStreamingServiceCredetials(state)?.accessToken;
    if (!playlistInfo) {
      await initUserPlaylistInfo(userId);
    } else if (accessToken) {
      const servicePlaylists = await getSpotifyUserPlaylists(
        accessToken,
        userId
      );
      for (const playlist of playlistInfo) {
        const fullPlaylistInfo = servicePlaylists?.find(
          (v) =>
            v.id === playlist.id &&
            v.streamingServiceId === playlist.streamingServiceId
        );

        if (fullPlaylistInfo) {
          const tracks =
            (await getSpotifyPlaylistTracks(accessToken, playlist.id)) ?? [];
          const tracksIDs = tracks.map((v) => v.id);
          const tracksInfo =
            (await getSpotifyTracksInfo(accessToken, tracksIDs)) ?? [];
          const tracksCompleteInfo = await Promise.all(
            tracksInfo.map(async (trackInfo) => {
              const analysis = await getTrackAnalysisFeatures(trackInfo.id);
              return {
                ...trackInfo,
                info: {
                  ...trackInfo.info,
                  tempo: analysis
                    ? getTempo(analysis.tempo)
                    : MusicTempo.MEDIUM,
                },
              };
            })
          );
          dispatch(updateTracks(tracksCompleteInfo));

          fullPlaylistInfo.active = playlist.active;
          fullPlaylistInfo.imported = true;
          fullPlaylistInfo.tracks = tracksIDs.map((id) => ({
            id,
            active: playlist.tracks?.find((v) => v.id === id)?.active ?? true,
          }));

          // Sync between firebase and Spotify
          const tracksToRemove = playlist.tracks?.filter(
            (track) => !tracksIDs.includes(track.id)
          );
          if (tracksToRemove) {
            await removeUserPlaylistTracks(
              userId,
              playlist.id,
              tracksToRemove.map((v) => v.id)
            );
          }

          const tracksToAdd = tracksIDs.filter(
            (track) => !playlist.tracks?.some((v) => v.id === track)
          );
          if (tracksToAdd) {
            await addUserPlaylistTracks(
              userId,
              playlist.id,
              tracksToAdd.map((v) => ({
                id: v,
                active: true,
              }))
            );
          }
        } else {
          await removeUserPlaylistInfo(userId, playlist as PlaylistType);
        }
      }
      return servicePlaylists;
    }
  }
);

export const toggleImportedAsync = createAsyncThunk(
  "playlists/toggleImportedAsync",
  async (id: string, { getState }) => {
    const state = getState() as RootState;
    const userId = getUserUId(state);
    const playlistInfo = getPlaylistById(id)(state) as PlaylistType;
    if (userId) {
      if (!playlistInfo.imported) {
        await addUserPlaylistInfo(userId, playlistInfo);
      } else {
        await removeUserPlaylistInfo(userId, playlistInfo);
      }
    }

    return id;
  }
);

export const toggleActiveAsync = createAsyncThunk(
  "playlists/toggleActiveAsync",
  async (id: string, { getState }) => {
    const state = getState() as RootState;
    const userId = getUserUId(state);
    const playlistId = getActivatedPlaylist(state)?.id;
    if (userId) {
      await setUserPlaylistActive(userId, id, playlistId !== id);
      if (playlistId && playlistId !== id) {
        await setUserPlaylistActive(userId, playlistId, false);
      }
    }
    return id;
  }
);

export const toggleTrackActiveAsync = createAsyncThunk(
  "playlists/toggleTrackActiveAsync",
  async (
    { playlistId, trackId }: { playlistId: string; trackId: string },
    { getState }
  ) => {
    const state = getState() as RootState;
    const userId = getUserUId(state);
    const track = getPlaylistById(playlistId)(state)?.tracks?.find(
      (v: TrackType) => v.id === trackId
    );
    if (track && userId) {
      await toggleUserPlaylistTrackActive(
        userId,
        playlistId,
        trackId,
        !track.active
      );
    }

    return { playlistId, trackId };
  }
);

export default playlistSlice.reducer as Reducer<typeof initialState>;
