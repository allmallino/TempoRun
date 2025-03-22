import { createSlice } from "@reduxjs/toolkit";
import { StreamingServiceType } from "./types";
import { revertAll } from "../actions";

interface streamingServicesState {
  value: StreamingServiceType | null;
}

const initialState: streamingServicesState = {
  value: null,
};

const streamingServicesSlice = createSlice({
  name: "streamingServices",
  initialState,
  reducers: {
    addStreamingService: (state, action) => {
      state.value = action.payload;
    },
    removeStreamingService: (state) => {
      state.value = null;
    },
    updateStreamingCredentials: (state, action) => {
      if (state.value) state.value.credentials = action.payload;
    },
  },
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
});

export const {
  addStreamingService,
  removeStreamingService,
  updateStreamingCredentials,
} = streamingServicesSlice.actions;

export default streamingServicesSlice.reducer;
