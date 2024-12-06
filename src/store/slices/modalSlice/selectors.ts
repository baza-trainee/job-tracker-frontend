import { RootState } from "../../store";

export const isOpenModal = (state:RootState) => state.modal.isModalOpen;
export const modalContent = (state:RootState) => state.modal.modalContent;
export const modalCallFunction = (state:RootState) => state.modal.onCallFunction;
export const typeModal = (state:RootState) => state.modal.typeModal;
export const colorModal = (state:RootState) => state.modal.colorModal;
