import { ReactNode } from "react";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ typeModal: "success" | "error" | "confirm" | "popup"; content?: (ReactNode | string); onCallFunction?: () => unknown }>) => {
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
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});

export const { openModal, closeModal, toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
