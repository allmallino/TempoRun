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
      streamingServiceId: 1,
      active: false,
      imported: true,
      tracks: [
        { id: 1, active: true },
        { id: 2, active: true },
        { id: 3, active: true },
        { id: 4, active: true },
        { id: 5, active: true },
        { id: 6, active: true },
        { id: 7, active: true },
        { id: 8, active: true },
        { id: 9, active: true },
      ],
    },
    {
      info: { name: "Jazz", platform: "Spotify" },
      id: 2,
      streamingServiceId: 1,
      active: false,
      imported: true,
      tracks: [
        { id: 1, active: true },
        { id: 2, active: true },
        { id: 3, active: true },
        { id: 4, active: true },
        { id: 5, active: true },
        { id: 6, active: true },
        { id: 7, active: true },
        { id: 8, active: true },
        { id: 9, active: true },
      ],
    },
    {
      info: { name: "Rock", platform: "YouTube Music" },
      id: 3,
      streamingServiceId: 3,
      active: false,
      imported: false,
      tracks: [
        { id: 1, active: true },
        { id: 2, active: true },
        { id: 3, active: true },
        { id: 4, active: true },
        { id: 5, active: true },
        { id: 6, active: true },
        { id: 7, active: true },
        { id: 8, active: true },
        { id: 9, active: true },
      ],
    },
    {
      info: { name: "Pop", platform: "Spotify" },
      id: 4,
      streamingServiceId: 1,
      active: false,
      imported: false,
      tracks: [
        { id: 1, active: true },
        { id: 2, active: true },
        { id: 3, active: true },
        { id: 4, active: true },
        { id: 5, active: true },
        { id: 6, active: true },
        { id: 7, active: true },
        { id: 8, active: true },
        { id: 9, active: true },
      ],
    },
    {
      info: { name: "Hyper Pop", platform: "Spotify" },
      id: 5,
      streamingServiceId: 1,
      active: false,
      imported: false,
      tracks: [
        { id: 1, active: true },
        { id: 2, active: true },
        { id: 3, active: true },
        { id: 4, active: true },
        { id: 5, active: true },
        { id: 6, active: true },
        { id: 7, active: true },
        { id: 8, active: true },
        { id: 9, active: true },
      ],
    },
    {
      info: { name: "Death Grips collection", platform: "Apple Music" },
      id: 6,
      streamingServiceId: 2,
      active: false,
      imported: false,
      tracks: [
        { id: 1, active: true },
        { id: 2, active: true },
        { id: 3, active: true },
        { id: 4, active: true },
        { id: 5, active: true },
        { id: 6, active: true },
        { id: 7, active: true },
        { id: 8, active: true },
        { id: 9, active: true },
      ],
    },
    {
      info: { name: "This is Eminem", platform: "Spotify" },
      id: 7,
      streamingServiceId: 1,
      active: false,
      imported: false,
      tracks: [
        { id: 1, active: true },
        { id: 2, active: true },
        { id: 3, active: true },
        { id: 4, active: true },
        { id: 5, active: true },
        { id: 6, active: true },
        { id: 7, active: true },
        { id: 8, active: true },
        { id: 9, active: true },
      ],
    },
    {
      info: { name: "This is Kanye West", platform: "Spotify" },
      id: 8,
      streamingServiceId: 1,
      active: false,
      imported: false,
      tracks: [
        { id: 1, active: true },
        { id: 2, active: true },
        { id: 3, active: true },
        { id: 4, active: true },
        { id: 5, active: true },
        { id: 6, active: true },
        { id: 7, active: true },
        { id: 8, active: true },
        { id: 9, active: true },
      ],
    },
    {
      info: { name: "Rap", platform: "Apple Music" },
      id: 9,
      streamingServiceId: 2,
      active: false,
      imported: false,
      tracks: [
        { id: 1, active: true },
        { id: 2, active: true },
        { id: 3, active: true },
        { id: 4, active: true },
        { id: 5, active: true },
        { id: 6, active: true },
        { id: 7, active: true },
        { id: 8, active: true },
        { id: 9, active: true },
      ],
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
        } else if (playlist.active) {
          return { ...playlist, active: false };
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
    toggleTrackActive: (state, action) => {
      state.value = state.value.map((playlist) => {
        if (playlist.id === action.payload.playlistId) {
          return {
            ...playlist,
            tracks: playlist.tracks?.map((track) => {
              if (track.id === action.payload.trackId) {
                return { ...track, active: !track.active };
              }
              return track;
            }),
          };
        }
        return playlist;
      });
    },
  },
});

export const { toggleActive, toggleImported, toggleTrackActive } =
  playlistSlice.actions;

export default playlistSlice.reducer;
