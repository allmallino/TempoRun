import { createSlice } from "@reduxjs/toolkit";

interface loaderState {
  value: {
    loaderIsVisible: boolean;
  };
}

const initialState: loaderState = {
  value: {
    loaderIsVisible: false,
  },
};

const loaderSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setLoaderVisibility: (state, action) => {
      state.value.loaderIsVisible = action.payload;
    },
  },
});

export const { setLoaderVisibility } = loaderSlice.actions;

export default loaderSlice.reducer;
