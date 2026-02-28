import { configureStore } from "@reduxjs/toolkit";
import { tokenReducer } from "./TokenSlice";
import { userReducer } from "./UserSlice";
import { toolBarReducer } from "./ToolBarSlice";
import { modalReducer } from "./ModalSlice";

export const store = configureStore({
    reducer: {
        token: tokenReducer,
        user: userReducer,
        toolbar: toolBarReducer,
        modal: modalReducer,
    }
})