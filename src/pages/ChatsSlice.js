import { createSlice } from "@reduxjs/toolkit";



export const initialState = {
    chatId: 'null',
    user: {}
}
const chats = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        changeUser: (state, action) => {
            console.log(action.payload.uInfo);
            console.log(action.payload.currU);
            return {
                user: action.payload.uInfo,
                chatId: action.payload.currU.uid > action.payload.uInfo.uid
                    ? action.payload.currU.uid + action.payload.uInfo.uid
                    : action.payload.uInfo.uid + action.payload.currU.uid
            }
        },
    }
})

export const { changeUser } = chats.actions

export default chats.reducer