export type InfoModalProps = {
  type:
    | "logInSuccess"
    | "logInError"
    | "signUpSuccess"
    | "signUpError"
    | "forgotPasswordSuccess"
    | "resetPasswordSuccess"
    | "resetPasswordErrorLink"
    | "logOut";
  textColor: string;
};
