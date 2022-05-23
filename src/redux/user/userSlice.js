import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedInUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveLoginData: (state, action) => {
      state.loggedInUser = action.payload;
    },
    reset: (state) => {
      state.loggedInUser = null;
    }
  },
});

export const { saveLoginData, reset } = userSlice.actions;

export default userSlice.reducer;
