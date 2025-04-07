import { RootState } from "../store";

export const getSelectedMode = (state: RootState) =>
  state.mode.value.selectedMode;

export const getSelectedOption = (state: RootState) =>
  state.mode.value.modsInfo[state.mode.value.selectedMode];
