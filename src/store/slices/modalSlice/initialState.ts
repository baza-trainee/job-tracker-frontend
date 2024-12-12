export interface ModalProps {
  isModalOpen?: boolean;
  typeModal:
    | "close"
    | "forgotPassword"
    | "logInSuccess"
    | "logInError"
    | "signUpSuccess"
    | "signUpError"
    | "forgotPasswordSuccess"
    | "resetPasswordErrorLink"
    | "resetPasswordSuccess"
    | "contactUs"
    | "logOut";
}

export const initialState: ModalProps = {
  isModalOpen: false,
  typeModal: "close",
};
