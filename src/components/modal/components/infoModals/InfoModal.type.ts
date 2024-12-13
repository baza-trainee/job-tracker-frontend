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
  color: "button" | "color2" | "color8";
};
