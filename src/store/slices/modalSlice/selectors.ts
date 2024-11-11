import { RootState } from "../../store";

export const isOpenModal = (state:RootState) => state.modal.isModalOpen;
export const modalContent = (state:RootState) => state.modal.content;
export const modalCallFunction = (state:RootState) => state.modal.onCallFunction;
export const typeModal = (state:RootState) => state.modal.typeModal;
