import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, ModalProps } from "./initialState";

const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalProps>) => {
      state.isModalOpen = true;
      state.typeModal = action.payload.typeModal;
      state.idCardVacancy = action.payload.idCardVacancy;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.typeModal = "close";
      state.idCardVacancy = "";
    },
    openConfirmation: (state, action: PayloadAction<ModalProps>) => {
      state.isConfirmationOpen = true;
      state.typeConfirmation = action.payload.typeConfirmation;
    },
    closeConfirmation: (state) => {
      state.isConfirmationOpen = false;
      state.typeConfirmation = "close";
    },
  },
});

export const {
  openModal,
  closeModal,
  openConfirmation,
  closeConfirmation,
} = modalSlice.actions;
export default modalSlice.reducer;

// const modalSlice = createSlice({
//   name: "modal",
//   initialState: initialState,
//   reducers: {
//     openModal: (state, action: PayloadAction<ModalProps>) => {
//       state.isModalOpen = true;
//       state.typeModal = action.payload.typeModal;
//       if (state.list) {
//           state.list = [...state.list, action.payload.typeModal];
//         }
//       },
//       closeModal: (state) => {
//         state.isModalOpen = false;
//         state.typeModal = "close"
//       if (state.list) {
//         state.typeModal = state.list[state.list.length-2];
//         state.list = state.list.slice(0, -1);
//       }
//     },
//   },
// });
