import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../Auth/authData";

const initialState  = {
    user : null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        onLogin(state, action){
            state.user = action.payload
        },
        onLogout(state){
            state.user = null;
        }
    }
})

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;