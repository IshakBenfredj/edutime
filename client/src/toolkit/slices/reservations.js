import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../api";

export const getReservations = createAsyncThunk('reservationsSlice/getReservations', async () => {
    const { data } = await Axios.get('/reservations')
    return data
})

const reservationsSlice = createSlice({
    initialState : [],
    name : 'reservationsSlice',
    reducers: {
        addReservation : (state,action) => {
            state.push(action.payload)
        },
        deleteReservation : (state,action) => {
            const filterReservations = state.filter( reservation => reservation._id !== action.payload )
            return filterReservations
        }
    },
    extraReducers : (builder) => {
        builder.addCase(getReservations.fulfilled, (state, action) => {
            return action.payload
        })
    },
})

export const { addReservation, deleteReservation } = reservationsSlice.actions
export default reservationsSlice.reducer