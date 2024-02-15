import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: null,
  reducers: {
    login: (state, action) => {
      return action.payload;
    },
    update: (state, action) => {
      return action.payload;
    },
    logout: (state, action) => {
      return null;
    },
  },
});

export const { login, update, logout } = userSlice.actions;
export default userSlice.reducer;
