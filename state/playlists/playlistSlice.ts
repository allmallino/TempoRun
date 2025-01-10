import { createSlice } from "@reduxjs/toolkit";
import { PlaylistType } from "./types";

interface playlistState {
  value: PlaylistType[];
}

const initialState: playlistState = {
  value: [
    {
      info: { name: "Hip-Hop", platform: "Spotify" },
      id: 1,
      active: false,
      imported: true,
    },
    {
      info: { name: "Jazz", platform: "Spotify" },
      id: 2,
      active: false,
      imported: true,
    },
    {
      info: { name: "Rock", platform: "YouTube Music" },
      id: 3,
      active: false,
      imported: true,
    },
    {
      info: { name: "Pop", platform: "Spotify" },
      id: 4,
      active: false,
      imported: true,
    },
    {
      info: { name: "Hyper Pop", platform: "Spotify" },
      id: 5,
      active: true,
      imported: true,
    },
    {
      info: { name: "Death Grips collection", platform: "Apple Music" },
      id: 6,
      active: false,
      imported: false,
    },
    {
      info: { name: "This is Eminem", platform: "Spotify" },
      id: 7,
      active: false,
      imported: false,
    },
    {
      info: { name: "This is Kanye West", platform: "Spotify" },
      id: 8,
      active: false,
      imported: false,
    },
    {
      info: { name: "Rap", platform: "Apple Music" },
      id: 9,
      active: false,
      imported: false,
    },
  ],
};

const playlistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    toggleActive: (state, action) => {
      state.value = state.value.map((playlist) => {
        if (playlist.id === action.payload) {
          return { ...playlist, active: !playlist.active };
        }
        return playlist;
      });
    },
    toggleImported: (state, action) => {
      state.value = state.value.map((playlist) => {
        if (playlist.id === action.payload) {
          return { ...playlist, imported: !playlist.imported };
        }
        return playlist;
      });
    },
  },
});

export const { toggleActive, toggleImported } = playlistSlice.actions;

export default playlistSlice.reducer;
