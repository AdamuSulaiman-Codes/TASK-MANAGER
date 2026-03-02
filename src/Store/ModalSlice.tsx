import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ReactNode } from "react";

interface ModalState {
  isOpen: boolean;
  content: ReactNode | null; // content to render
}

const initialState: ModalState = {
  isOpen: false,
  content: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<ReactNode>) {
      state.isOpen = true;
      state.content = action.payload;
    },
    closeModal(state) {
      state.isOpen = false;
      state.content = null;
    },
    toggleModal(state, action?: PayloadAction<ReactNode>) {
      state.isOpen = !state.isOpen;
      if (action) state.content = action.payload || null;
    },
  },
});

export const modalReducer = modalSlice.reducer;
export const modalActions = modalSlice.actions;