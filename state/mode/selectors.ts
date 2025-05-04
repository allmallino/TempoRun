import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";
export const getSelectedMode = (state: RootState) =>
  state.mode.value.selectedMode;

export const getSelectedOptions = (state: RootState) =>
  state.mode.value.modsInfo[state.mode.value.selectedMode];

export const getSelectedOptionByIndex = (index: number) =>
  createSelector(
    (state: RootState) =>
      state.mode.value.modsInfo[state.mode.value.selectedMode],
    (modsInfo) => modsInfo[index]
  );
