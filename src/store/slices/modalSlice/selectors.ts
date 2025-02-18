import { RootState } from "../../store";

export const isOpenModal = (state: RootState) => state.modal.isModalOpen;
export const typeModal = (state: RootState) => state.modal.typeModal;
export const idCardVacancy = (state: RootState) => state.modal.idCardVacancy;
export const selectEventData = (state: RootState) => state.modal.eventData;
