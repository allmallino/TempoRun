import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StreamingServiceType } from "./types";
import { revertAll } from "../actions";
import {
  getUserStreamingInfo,
  initUserStreamingInfo,
  setUserStreamingInfo,
} from "@/services/firestoreService";
import {
  getSpotifyUserProfile,
  getValidSpotifyToken,
} from "@/services/spotifyService";
import { Alert } from "react-native";

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
  extraReducers: (builder) =>
    builder
      .addCase(revertAll, () => initialState)
      .addCase(initStreamingStateAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.value = action.payload;
        }
      }),
});

export const {
  addStreamingService,
  removeStreamingService,
  updateStreamingCredentials,
} = streamingServicesSlice.actions;

export const initStreamingStateAsync = createAsyncThunk(
  "streamingServices/initStreamingStateAsync",
  async (userId: string) => {
    const streamingInfo = await getUserStreamingInfo(userId);
    if (!streamingInfo) {
      await initUserStreamingInfo(userId);
    } else if (streamingInfo?.accessToken) {
      const credentials = await getValidSpotifyToken(streamingInfo);
      console.log(credentials);
      if (credentials) {
        if (credentials.accessToken !== streamingInfo.accessToken) {
          await setUserStreamingInfo(userId, credentials);
        }

        const userInfo = await getSpotifyUserProfile(credentials.accessToken);
        if (userInfo) {
          return {
            ...userInfo,
            credentials,
          };
        } else {
          await initUserStreamingInfo(userId);
          Alert.alert("Error", "There were an error. Please log in again.");
        }
      }
    }
  }
);

export default streamingServicesSlice.reducer;
