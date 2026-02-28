import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const expiration = localStorage.getItem("expirationTime");
const isAlreadyValid = !!token && !!expiration && Date.now() <= Number(expiration);

if (!isAlreadyValid) {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
}

const initialState = {
  token: isAlreadyValid ? token : null,
  isAuthChecked: true, // ✅ true immediately if token is valid
};

const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers:{
        onLogin(state, action) {
            const { token, expiresIn } = action.payload;
            const expirationTime = Date.now() + expiresIn;
            state.token = token;
            localStorage.setItem("token", token);
            localStorage.setItem("expirationTime", expirationTime.toString());
        },
        onLogOut(state) {
            state.token = null;
            localStorage.removeItem("token");
            localStorage.removeItem("expirationTime");
        },
        setAuthChecked(state) {
            state.isAuthChecked = true; 
        },
    }
})

export const tokenReducer = tokenSlice.reducer;
export const tokenActions = tokenSlice.actions;