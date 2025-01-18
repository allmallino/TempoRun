import { createSlice } from "@reduxjs/toolkit";
import { TrackType } from "./types";

interface trackState {
  value: TrackType[];
}

const initialState: trackState = {
  value: [
    { id: 1, info: { name: "Song 1", artist: "Artist 1" } },
    { id: 2, info: { name: "Song 2", artist: "Artist 2" } },
    { id: 3, info: { name: "Song 3", artist: "Artist 3" } },
    { id: 4, info: { name: "Song 4", artist: "Artist 4" } },
    { id: 5, info: { name: "Song 5", artist: "Artist 5" } },
    { id: 6, info: { name: "Song 6", artist: "Artist 6" } },
    { id: 7, info: { name: "Song 7", artist: "Artist 7" } },
    { id: 8, info: { name: "Song 8", artist: "Artist 8" } },
    { id: 9, info: { name: "Song 9", artist: "Artist 9" } },
  ],
};

const tracksSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {},
});

export const tracksSliceActions = tracksSlice.actions;

export default tracksSlice.reducer;
