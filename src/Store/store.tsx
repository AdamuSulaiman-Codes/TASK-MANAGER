import { configureStore } from "@reduxjs/toolkit";
import { tokenReducer } from "./TokenSlice";

export const store = configureStore({
    reducer: {
        token: tokenReducer,
    }
})