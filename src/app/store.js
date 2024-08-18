import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";
import {apiSlice} from "./api/apiSlice"
import refreshTokenSlice from "../features/Auth/refreshTokenSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [refreshTokenSlice.reducerPath]: refreshTokenSlice.reducer,
        auth: authReducer,
    }, middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware, refreshTokenSlice.middleware)
})