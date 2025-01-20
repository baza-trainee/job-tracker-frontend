import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalProps } from "./initialState";

const initialState: ModalProps = {
  isModalOpen: false,
  typeModal: "close",
  isConfirmationOpen: false,
  typeConfirmation: "close",
  idCardVacancy: "",
  dataConfirmation: null,
  borderColorModal: null,
  backgroundColorModal: null,
  vacancyData: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalProps>) => {
      state.isModalOpen = true;
      state.typeModal = action.payload.typeModal;
      state.idCardVacancy = action.payload.idCardVacancy;
      state.borderColorModal = action.payload.borderColorModal;
      state.backgroundColorModal = action.payload.backgroundColorModal;
      state.vacancyData = action.payload.vacancyData;
      state.dataConfirmation = action.payload.dataConfirmation;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.typeModal = "close";
      state.idCardVacancy = "";
      state.borderColorModal = "";
      state.backgroundColorModal = "";
      state.vacancyData = null;
      state.dataConfirmation = null;
    },
    openConfirmation: (state, action: PayloadAction<ModalProps>) => {
      state.isConfirmationOpen = true;
      state.typeConfirmation = action.payload.typeConfirmation;
      state.dataConfirmation = action.payload.dataConfirmation;
    },
    closeConfirmation: (state) => {
      state.isConfirmationOpen = false;
      state.typeConfirmation = "close";
      state.dataConfirmation = null;
    },
  },
});

export const { openModal, closeModal, openConfirmation, closeConfirmation } =
  modalSlice.actions;
export default modalSlice.reducer;
