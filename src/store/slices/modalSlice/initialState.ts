interface ModalState {
  isModalOpen: boolean;
  typeModal: "success" | "error" | "confirm" | "popup";
  content?: string;
  onCallFunction?: () => void;
}

export const initialState: ModalState = {
  isModalOpen: false,
  typeModal: "success",
  content: undefined,
  onCallFunction: undefined,
};
