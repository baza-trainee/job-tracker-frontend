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
  eventData: null,
  profileData: null,
  isButtonOpen: false,
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
      state.eventData = action.payload.eventData || null;
      state.profileData = action.payload.profileData;
      state.dataConfirmation = action.payload.dataConfirmation;
      state.noteData = action.payload.noteData;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.typeModal = "close";
      state.idCardVacancy = "";
      state.borderColorModal = "";
      state.backgroundColorModal = "";
      state.vacancyData = null;
      state.dataConfirmation = null;
      state.profileData = null;
      state.noteData = null;
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
    closeButton: (state, action: PayloadAction<ModalProps>) => {
      state.isButtonOpen = action.payload.isButtonOpen;
      state.resetForm = action.payload.resetForm;
    },
  },
});

export const {
  openModal,
  closeModal,
  openConfirmation,
  closeConfirmation,
  closeButton,
} = modalSlice.actions;
export default modalSlice.reducer;
