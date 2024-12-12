import { ForgotPassword } from "./components/formModals/ForgotPassword";
import ContactUs from "./components/formModals/ContacUs";
import InfoModal from "./components/infoModals/InfoModal";
import { ReactNode } from "react";

type ContentMapProps = {
  [propsTypeName: string]: {
    content: ReactNode;
    color: "button" | "color2" | "color8";
  };
};

const colorButton = "button";
const colorSuccess = "color8";
const colorError = "color2";

export const contentMap: ContentMapProps = {
  forgotPassword: {
    content: <ForgotPassword />,
    color: colorButton,
  },
  contactUs: {
    content: <ContactUs />,
    color: colorButton,
  },
  logInSuccess: {
    content: <InfoModal type="logInSuccess" color={colorSuccess} />,
    color: colorSuccess,
  },
  logInError: {
    content: <InfoModal type="logInError" color={colorError} />,
    color: colorError,
  },
  signUpSuccess: {
    content: <InfoModal type="signUpSuccess" color={colorSuccess} />,
    color: colorSuccess,
  },
  signUpError: {
    content: <InfoModal type="signUpError" color={colorError} />,
    color: colorError,
  },
  forgotPasswordSuccess: {
    content: <InfoModal type="forgotPasswordSuccess" color={colorSuccess} />,
    color: colorSuccess,
  },
  resetPasswordSuccess: {
    content: <InfoModal type="resetPasswordSuccess" color={colorSuccess} />,
    color: colorSuccess,
  },
  resetPasswordErrorLink: {
    content: <InfoModal type="resetPasswordErrorLink" color={colorError} />,
    color: colorError,
  },
  logOut: {
    content: <InfoModal type="logOut" color={colorButton} />,
    color: colorButton,
  },
  close: {
    content: "close modal",
    color: colorButton,
  },
};
