import { createSlice } from "@reduxjs/toolkit";
import { PlaylistType } from "./types";
import { revertAll } from "../actions";

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
    toggleActive: (state, action) => {
      state.value = state.value.map((playlist) => {
        if (playlist.id === action.payload) {
          return { ...playlist, active: !playlist.active };
        } else if (playlist.active) {
          return { ...playlist, active: false };
        }
        return playlist;
      });
    },
    toggleImported: (state, action) => {
      state.value = state.value.map((playlist) => {
        if (playlist.id === action.payload) {
          return { ...playlist, imported: !playlist.imported, active: false };
        }
        return playlist;
      });
    },
    toggleTrackActive: (state, action) => {
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
    },
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
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
});

export const {
  toggleActive,
  toggleImported,
  toggleTrackActive,
  updatePlaylists,
  updatePlaylistTracks,
} = playlistSlice.actions;

export default playlistSlice.reducer;
