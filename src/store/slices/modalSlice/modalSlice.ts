import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { ReactNode } from "react";

type modalPayload =
  | { typeModal: "success" | "error" | "errorMailExist" | "recoveryPassword" | "popup" | "custom"; modalContent?: string | ReactNode; onCallFunction?: () => void; colorModal?: string | undefined }
  | { typeModal: "confirm"; modalContent?: string | ReactNode; onCallFunction: () => void };


const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    openModal: (state, action: PayloadAction<modalPayload>) => {
      state.isModalOpen = true;
      state.modalContent = action.payload.modalContent;
      state.onCallFunction = action.payload.onCallFunction;
      state.typeModal = action.payload.typeModal;
      state.colorModal = action.payload.colorModal;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalContent = undefined;
      state.onCallFunction = undefined;
      state.typeModal = "success";
      state.colorModal = "";
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
