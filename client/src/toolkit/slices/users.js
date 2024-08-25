import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../api";

export const getUsers = createAsyncThunk(
  "usersSlice/getUsers",
  async () => {
    const { data } = await Axios.get("/users", {
    headers: {
      "x-custom-header": "secretValueForEdutimeWebsiteEducationAliHani",
    },
  });
    return data;
  }
);

const usersSlice = createSlice({
  initialState: {
    users: [],
  },
  name: "usersSlice",
  reducers: {
    deleteUser: (state, action) => {
      const usersWithoutdeletedCourse = state.filter(
        (user) => user._id !== action.payload
      );
      return usersWithoutdeletedCourse;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
