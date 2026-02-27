import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  token: localStorage.getItem("token") || null,
};

const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers:{
        onLogin(state, action){
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        onLogOut(state){
            state.token = null;
            localStorage.removeItem("token");
        }
    }
})

export const tokenReducer = tokenSlice.reducer;
export const tokenActions = tokenSlice.actions;