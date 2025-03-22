import { RootState } from "../store";

export const getStreamingService = (state: RootState) => state.streaming.value;

export const getStreamingServiceInfo = (state: RootState) =>
  state.streaming.value?.info;

export const getStreamingServiceCredetials = (state: RootState) =>
  state.streaming.value?.credentials;

export const getStreamingServiceStatus = (state: RootState) =>
  !!state.streaming.value;
