export type InfoModalProps = {
  type:
    | "logInSuccess"
    | "logInError"
    | "signUpSuccess"
    | "signUpError"
    | "forgotPasswordSuccess"
    | "resetPasswordSuccess"
    | "resetPasswordErrorLink"
    | "logOut"
    | "saveAddVacancies"
    | "deleteVacancy"
    | "arhiveVacancy"
    | "saveEditVacancies";
  textColor: string;
};
