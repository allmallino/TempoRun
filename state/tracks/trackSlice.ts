import { createSlice } from "@reduxjs/toolkit";
import { TrackType } from "./types";
import { revertAll } from "../actions";

interface trackState {
  value: TrackType[];
}

const initialState: trackState = {
  value: [],
};

const tracksSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    updateTracks: (state, action) => {
      const incoming = action.payload;
      incoming.forEach((newTrack: TrackType) => {
        const existingIndex = state.value.findIndex(
          (oldTrack) => oldTrack.id === newTrack.id
        );
        if (existingIndex < 0) {
          state.value.push(newTrack);
        }
      });
    },
  },
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
});

export const { updateTracks } = tracksSlice.actions;
export default tracksSlice.reducer;
