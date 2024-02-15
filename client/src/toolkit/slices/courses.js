import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../api";

export const getCourses = createAsyncThunk(
  "coursesSlice/getCourses",
  async () => {
    const { data } = await Axios.get("/courses");
    return data;
  }
);

const coursesSlice = createSlice({
  initialState: [],
  name: "coursesSlice",
  reducers: {
    addCourse: (state, action) => {
      state.push(action.payload);
    },
    deleteCourse: (state, action) => {
      const coursesWithoutdeletedCourse = state.filter(
        (course) => course._id !== action.payload
      );
      return coursesWithoutdeletedCourse;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCourses.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addCourse, deleteCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
