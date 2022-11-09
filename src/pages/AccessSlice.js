import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    user: null,
}
const access = createSlice({
    name: 'access',
    initialState,
    reducers: {
        login: (state, action) => {
            return {
                // ...state,
                // user: action.payload
                user: action.payload
            }
        },

    }
})

export const { login } = access.actions

export default access.reducer