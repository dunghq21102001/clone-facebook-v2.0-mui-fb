import { configureStore } from '@reduxjs/toolkit';
import AccessSlice from './pages/AccessSlice';
import ChatsSlice from './pages/ChatsSlice';
import PostsSlice from './pages/PostsSlice';
import UsersListSlice from './pages/UsersListSlice';
export const store = configureStore({
    reducer: {
        access: AccessSlice,
        posts: PostsSlice,
        users: UsersListSlice,
        chats: ChatsSlice,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})