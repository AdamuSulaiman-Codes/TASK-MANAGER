import { configureStore } from "@reduxjs/toolkit";
import { tokenReducer } from "./TokenSlice";
import { userReducer } from "./UserSlice";

export const store = configureStore({
    reducer: {
        token: tokenReducer,
        user: userReducer,
    }
})