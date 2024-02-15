import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../api";

export const getArticles = createAsyncThunk('articlesSlice/getArticles', async () => {
    const { data } = await Axios.get('/articles')
    return data
})

const articlesSlice = createSlice({
    initialState : [],
    name : 'articlesSlice',
    reducers: {
        addArticle : (state,action) => {
            state.push(action.payload)
        },
        deleteArticle : (state,action) => {
            const filterArticles = state.filter( article => article._id !== action.payload )
            return filterArticles
        }
    },
    extraReducers : (builder) => {
        builder.addCase(getArticles.fulfilled, (state, action) => {
            return action.payload
        })
    },
})

export const { addArticle, deleteArticle } = articlesSlice.actions
export default articlesSlice.reducer