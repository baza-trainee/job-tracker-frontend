import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ typeModal: "success" | "error" | "confirm" | "popup"; content?: string; onCallFunction?: () => unknown }>) => {
      state.isModalOpen = true;
      state.content = action.payload.content;
      state.onCallFunction = action.payload.onCallFunction;
      state.typeModal = action.payload.typeModal;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.content = undefined;
      state.onCallFunction = undefined;
      state.typeModal = "success";
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
