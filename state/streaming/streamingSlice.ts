import { createSlice } from "@reduxjs/toolkit";
import { StreamingServiceType } from "./types";
import { Platform } from "../playlists/types";

interface streamingServicesState {
  value: StreamingServiceType[];
}

const initialState: streamingServicesState = {
  value: [],
};

const streamingServicesSlice = createSlice({
  name: "streamingServices",
  initialState,
  reducers: {
    addStreamingService: (state, action) => {
      state.value.push(action.payload);
    },
    removeStreamingService: (state, action) => {
      state.value = state.value.filter(
        (service) => service.id !== action.payload
      );
    },
  },
});

export const { addStreamingService, removeStreamingService } =
  streamingServicesSlice.actions;

export default streamingServicesSlice.reducer;
