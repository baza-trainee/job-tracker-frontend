import { Vacancy } from "@/types/vacancies.types";

export interface ModalProps {
  isModalOpen?: boolean;
  typeModal?: string;
  isConfirmationOpen?: boolean;
  typeConfirmation?: string;
  idCardVacancy?: string;
  vacancyData?: Vacancy | null;
  dataConfirmation?: any | null; // alex
  borderColorModal?: string | null;
  backgroundColorModal?: string | null;
}

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
