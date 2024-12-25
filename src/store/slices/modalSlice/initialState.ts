export interface ModalProps {
  isModalOpen?: boolean;
  typeModal?: string;
  isConfirmationOpen?: boolean;
  typeConfirmation?: string;
  idCardVacancy?: string;
}

export const initialState: ModalProps = {
  isModalOpen: false,
  typeModal: "close",
  isConfirmationOpen: false,
  typeConfirmation: "close",
  idCardVacancy: "",
};

// TODO: коли всі модалки будуть готові дописати їх типи в typeModal замість string
// export interface ModalProps {
//   isModalOpen?: boolean;
//   typeModal:
//     | "close"
//     | "forgotPassword"
//     | "logInSuccess"
//     | "logInError"
//     | "signUpSuccess"
//     | "signUpError"
//     | "forgotPasswordSuccess"
//     | "resetPasswordErrorLink"
//     | "resetPasswordSuccess"
//     | "contactUs"
//     | "logOut";
// }
