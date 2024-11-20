export interface ModalState {
  isModalOpen: boolean;
  typeModal: "success" | "error" | "errorMailExist" | "recoveryPassword" | "confirm" | "popup";
  modalContent?: string;
  onCallFunction?: () => void;
}

export const initialState: ModalState = {
  isModalOpen: false,
  typeModal: "success",
  modalContent: undefined,
  onCallFunction: undefined,
};
