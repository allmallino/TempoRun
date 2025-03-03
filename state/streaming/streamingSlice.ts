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
    updateStreamingCredentials: (state, action) => {
      const incoming = action.payload;
      const index = state.value.findIndex(
        (service) => service.id === incoming.id
      );
      if (index >= 0) {
        state.value[index].credentials = incoming.credentials;
      }
    },
  },
});

export const {
  addStreamingService,
  removeStreamingService,
  updateStreamingCredentials,
} = streamingServicesSlice.actions;

export default streamingServicesSlice.reducer;
