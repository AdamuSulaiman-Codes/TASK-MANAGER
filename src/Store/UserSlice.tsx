import { createSlice } from "@reduxjs/toolkit";

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
        },
        setUser(state, action){
            state.user = action.payload
        },
    }
})

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;