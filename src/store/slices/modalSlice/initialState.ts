import { ReactNode } from "react";

export interface ModalState {
  isModalOpen: boolean;
  typeModal: "success" | "error" | "errorMailExist" | "recoveryPassword" | "confirm" | "popup" | "custom";
  modalContent?: string | ReactNode;
  onCallFunction?: () => void;
  colorModal?: string;
}

export const initialState: ModalState = {
  isModalOpen: false,
  typeModal: "success",
  modalContent: undefined,
  onCallFunction: undefined,
  colorModal: "",
};
