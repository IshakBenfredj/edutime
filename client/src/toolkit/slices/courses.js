import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../api";

export const getCourses = createAsyncThunk(
  "coursesSlice/getCourses",
  async () => {
    const { data } = await Axios.get("/courses", {
    headers: {
      "x-custom-header": "secretValueForEdutimeWebsiteEducationAliHani",
    },
  });
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
    updateCourse: (state, action) => {
      const { id, data } = action.payload;
      const index = state.findIndex((course) => course._id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...data };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCourses.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addCourse, deleteCourse,updateCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
