import { createSlice } from "@reduxjs/toolkit";

export const initialState = []
const users = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getListUsers: (state, action) => state = action.payload
        ,
        addUser: (state, action) => {
            state.push(action.payload)
        },

    }
})

export const { addUser, getListUsers } = users.actions

export default users.reducer