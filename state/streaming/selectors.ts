import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const getStreamingServices = (state: RootState) => state.streaming.value;

export const getStreamingServiceInfoById = (id: string) =>
  createSelector(
    (state: RootState) => state.streaming.value,
    (value) => value.find((service) => service.id === id)?.info
  );

export const getStreamingServiceCredetialsById = (id: string) =>
  createSelector(
    (state: RootState) => state.streaming.value,
    (value) => value.find((service) => service.id === id)?.credentials
  );
