import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  token: localStorage.getItem("token") || null,
};

const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers:{
        onLogin(state, action){
            localStorage.setItem("token", action.payload.token);
        },
        onLogOut(state, action){
            localStorage.removeItem("token");
        }
    }
})

export const tokenReducer = tokenSlice.reducer;
export const tokenActions = tokenSlice.actions;