import { createSlice } from "@reduxjs/toolkit";
import { StreamingServiceType } from "./types";
import { Platform } from "../playlists/types";

interface streamingServicesState {
  value: StreamingServiceType[];
}

const initialState: streamingServicesState = {
  value: [
    {
      id: 1,
      info: {
        platform: Platform.SPOTIFY,
        name: "allmall",
        profileImage: require("@/assets/images/profile-icon.png"),
      },
    },

    {
      id: 2,
      info: {
        platform: Platform.APPLE_MUSIC,
        name: "allmall",
        profileImage: require("@/assets/images/profile-icon.png"),
      },
    },

    {
      id: 3,
      info: {
        platform: Platform.YOUTUBE_MUSIC,
        name: "allmall",
        profileImage: require("@/assets/images/profile-icon.png"),
      },
    },
  ],
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
