import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StreamingServiceCredentialsType, StreamingServiceType } from "./types";
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
    removeStreamingService: (state) => {
      state.value = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(revertAll, () => initialState)
      .addCase(initStreamingStateAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.value = action.payload;
        }
      })
      .addCase(setStreamingServiceAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.value = action.payload;
        }
      })
      .addCase(updateStreamingCredentialsAsync.fulfilled, (state, action) => {
        if (state.value && action.payload)
          state.value.credentials = action.payload;
      }),
});

export const { removeStreamingService } = streamingServicesSlice.actions;

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

export const setStreamingServiceAsync = createAsyncThunk(
  "streamingServices/setStreamingServiceAsync",
  async ({
    userId,
    service,
  }: {
    userId: string;
    service: StreamingServiceType;
  }) => {
    if (userId) {
      await setUserStreamingInfo(userId, service.credentials);
    }
    return service;
  }
);

export const updateStreamingCredentialsAsync = createAsyncThunk(
  "streamingServices/updateStreamingCredentialsAsync",
  async ({
    userId,
    credentials,
  }: {
    userId: string;
    credentials: StreamingServiceCredentialsType;
  }) => {
    if (userId) {
      await setUserStreamingInfo(userId, credentials);
    }
    return credentials;
  }
);
export default streamingServicesSlice.reducer;
