import { ReactNode } from "react";

interface ModalState {
  isModalOpen: boolean;
  typeModal: "success" | "error" | "confirm" | "popup";
  content?: ReactNode | string;
  onCallFunction?: () => unknown;
}

export const initialState: ModalState = {
  isModalOpen: false,
  typeModal: "success",
  content: undefined,
  onCallFunction: undefined,
};
