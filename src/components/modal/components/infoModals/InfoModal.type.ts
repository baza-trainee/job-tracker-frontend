import { TypesModal } from "../../modalMappings";

export type InfoModalProps = {
  type: TypesModal | null;
  // | "logInSuccess"
  // | "logInError"
  // | "signUpSuccess"
  // | "signUpError"
  // | "forgotPasswordSuccess"
  // | "resetPasswordSuccess"
  // | "resetPasswordErrorLink"
  // | "logOut"
  // | "saveAddVacancies"
  // | "deleteVacancy"
  // | "arhiveVacancy"
  // | "saveEditVacancies";
  textColor: string;
};
