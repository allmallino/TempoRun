import { createSlice } from "@reduxjs/toolkit";
import { Mode, ModeOptionType, ModeType } from "./types";

interface modeState {
  value: ModeType;
}

const initialState: modeState = {
  value: {
    selectedMode: Mode.TIMER,
    modsInfo: {
      [Mode.TIMER]: [],
      [Mode.MAP]: [],
      [Mode.LENGTH]: [],
      [Mode.PACE]: [],
    },
  },
};

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setSelectedMode: (state, action) => {
      state.value.selectedMode = action.payload as Mode;
    },
    setOptions: (state, action) => {
      state.value.modsInfo[action.payload.indicator as Mode] = action.payload
        .options as ModeOptionType[];
    },
  },
});

export const { setSelectedMode, setOptions } = modeSlice.actions;

export default modeSlice.reducer;
