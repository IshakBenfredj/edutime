import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../api";

export const getComments = createAsyncThunk(
  "commentsSlice/getComments",
  async () => {
    const { data } = await Axios.get("/comments");
    return data.reverse();
  }
);

const commentsSlice = createSlice({
  initialState: [],
  name: "commentsSlice",
  reducers: {
    addComment: (state, action) => {
      state.push(action.payload);
    },
    deleteComment: (state, action) => {
      const filterComments = state.filter(
        (comment) => comment._id !== action.payload
      );
      return filterComments;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getComments.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addComment, deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;
