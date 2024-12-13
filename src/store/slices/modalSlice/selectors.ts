import { RootState } from "../../store";

export const isOpenModal = (state:RootState) => state.modal.isModalOpen;
export const typeModal = (state:RootState) => state.modal.typeModal;
