import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import usersReducer from '../features/users/usersSlice';
import { apiSlice } from "./apiSlice";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },

    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware)
})