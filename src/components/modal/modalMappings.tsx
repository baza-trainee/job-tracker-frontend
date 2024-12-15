import { ReactNode } from "react";

import { ForgotPassword } from "./components/formModals/ForgotPassword";

import ContactUs from "./components/formModals/ContacUs";
import InfoModal from "./components/infoModals/InfoModal";
import AddVacancy from "./components/addVacancyModals/AddVacancy";

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
  addVacancy: {
    content: <AddVacancy />,
    color: colorDefault,
  },
  forgotPassword: {
    content: <ForgotPassword />,
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },
  contactUs: {
    content: <ContactUs />,
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },
  logInSuccess: {
    content: <InfoModal type="logInSuccess" textColor={colorSuccess.text } />,
    bgColor: colorSuccess.bg,
    borderColor: colorSuccess.border,
  },
  logInError: {
    content: <InfoModal type="logInError" textColor={colorError.text} />,
    bgColor: colorError.bg,
    borderColor: colorError.border,
  },
  signUpSuccess: {
    content: <InfoModal type="signUpSuccess" textColor={colorSuccess.text} />,
    bgColor: colorSuccess.bg,
    borderColor: colorSuccess.border,
  },
  signUpError: {
    content: <InfoModal type="signUpError" textColor={colorError.text} />,
    bgColor: colorError.bg,
    borderColor: colorError.border,
  },
  forgotPasswordSuccess: {
    content: (
      <InfoModal type="forgotPasswordSuccess" textColor={colorSuccess.text} />
    ),
    bgColor: colorSuccess.bg,
    borderColor: colorSuccess.border,
  },
  resetPasswordSuccess: {
    content: (
      <InfoModal type="resetPasswordSuccess" textColor={colorSuccess.text} />
    ),
    bgColor: colorSuccess.bg,
    borderColor: colorSuccess.border,
  },
  resetPasswordErrorLink: {
    content: (
      <InfoModal type="resetPasswordErrorLink" textColor={colorError.text} />
    ),
    bgColor: colorError.bg,
    borderColor: colorError.border,
  },
  logOut: {
    content: <InfoModal type="logOut" textColor={colorButton.text} />,
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },
  close: {
    content: "close modal",
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },
};
