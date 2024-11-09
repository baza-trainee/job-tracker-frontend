import { RootState } from "../../store";

export const isOpenModal = (state:RootState) => {return state.modal.isModalOpen};
export const modalContent = (state:RootState) => {return state.modal.content};
export const modalCallFunction = (state:RootState) => {return state.modal.onCallFunction};
export const typeModal = (state:RootState) => {return state.modal.typeModal};
