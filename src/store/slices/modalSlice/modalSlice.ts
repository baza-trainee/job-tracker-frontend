import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, ModalProps } from "./initialState";

const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalProps>) => {
      state.isModalOpen = true;
      state.typeModal = action.payload.typeModal;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.typeModal = "close";
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
