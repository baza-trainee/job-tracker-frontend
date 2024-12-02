import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import React from "react";

type modalPayload =
  | {
      typeModal:
        | "success"
        | "error"
        | "errorMailExist"
        | "recoveryPassword"
        | "popup";
      // modalContent?: string;
      modalContent?: string | React.ReactNode;
      onCallFunction?: () => void;
    }
  | { typeModal: "confirm"; modalContent?: string | React.ReactNode; onCallFunction: () => void };

const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    openModal: (state, action: PayloadAction<modalPayload>) => {
      state.isModalOpen = true;
      state.modalContent = action.payload.modalContent;
      state.onCallFunction = action.payload.onCallFunction;
      state.typeModal = action.payload.typeModal;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalContent = undefined;
      state.onCallFunction = undefined;
      state.typeModal = "success";
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
