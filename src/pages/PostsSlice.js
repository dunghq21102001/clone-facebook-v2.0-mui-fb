import { createSlice } from "@reduxjs/toolkit";

export const initialState = []
const posts = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        listPosts: (state, action) => state = action.payload,

    }
})

export const { listPosts } = posts.actions

export default posts.reducer