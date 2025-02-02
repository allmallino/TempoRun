import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const getStreamingServices = (state: RootState) => state.streaming.value;

export const getStreamingServiceInfoById = (id: number) =>
  createSelector(
    (state: RootState) => state.streaming.value,
    (value) => value.find((service) => service.id === id)?.info
  );
