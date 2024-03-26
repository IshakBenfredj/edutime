import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosGetWithHeader } from "../../functions/axiosFunctions";

export const getClientReservations = createAsyncThunk(
  "reservationsSlice/getClientReservations",
  async () => {
    const data = await axiosGetWithHeader(`/reservations/client`);
    return data;
  }
);
export const getUserReservations = createAsyncThunk(
  "reservationsSlice/getUserReservations",
  async () => {
    const data = await axiosGetWithHeader(`/reservations/user`);
    return data;
  }
);

const reservationsSlice = createSlice({
  initialState: [],
  name: "reservationsSlice",
  reducers: {
    addReservation: (state, action) => {
      state.push(action.payload);
    },
    deleteReservation: (state, action) => {
      const filterReservations = state.filter(
        (reservation) => reservation._id !== action.payload
      );
      return filterReservations;
    },
    deleteAllLogout: (state, action) => {
      return [];
    },
    updateReservation: (state, action) => {
      const { id, data } = action.payload;
      const index = state.findIndex((r) => r._id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...data };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getClientReservations.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(getUserReservations.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addReservation, deleteReservation, deleteAllLogout,updateReservation } =
  reservationsSlice.actions;
export default reservationsSlice.reducer;
