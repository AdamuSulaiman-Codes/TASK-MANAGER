import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    searchTerm: String,
    statusTerm: String,
    priorityTerm: String,
    selectedDate: String,
}

const initialState : InitialState = {
    searchTerm: "",
    statusTerm: "",
    priorityTerm: "",
    selectedDate: "",
}

const toolBarSlice = createSlice({
    name: "toolBar",
    initialState,
    reducers: {
        onSearchTermChange(state, action){
            state.searchTerm = action.payload;
        },
        onStatusTermChange(state, action){
            state.statusTerm = action.payload;
        },
        onPriorityTermChange(state, action){
            state.priorityTerm = action.payload;
        },
        onDateChange(state, action){
            state.selectedDate = action.payload;
        }
    }
})

export const toolBarReducer = toolBarSlice.reducer;
export const toolBarActions = toolBarSlice.actions;