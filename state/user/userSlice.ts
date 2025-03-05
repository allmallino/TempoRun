import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "./types";
import { revertAll } from "../actions";

interface userState {
  user: UserType;
}

const initialState: userState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
