import { ForgotPassword } from "./components/formModals/ForgotPassword";
import ContactUs from "./components/formModals/ContacUs";
import InfoModal from "./components/infoModals/InfoModal";
import { ReactNode } from "react";
import AddVacancy from "./components/addVacancyModals/AddVacancy";
import { t } from "i18next";
import EditVacancy from "./components/editVacancy/EditVacancy";

type ContentMapProps = {
  [propsTypeName: string]: {
    content: ReactNode;
    nameModal?: string;
    bgColor: string;
    borderColor: string;
  };
};

const colorDefault = {
  text: "text-white",
  bg: "bg-white",
  border: "border-white",
};

const colorButton = {
  text: "text-button",
  bg: "bg-button",
  border: "border-button",
};

const colorError = {
  text: "text-color2",
  bg: "bg-color2",
  border: "border-color2",
};
const colorSuccess = {
  text: "text-color8",
  bg: "bg-color8",
  border: "border-color8",
};

export const contentMap: ContentMapProps = {
  addVacancy: {
    content: <AddVacancy />,
    nameModal: t("addVacancy.nameModal.name"),
    bgColor: colorDefault.bg,
    borderColor: colorDefault.border,
  },
  editVacancy: {
    content: <EditVacancy />,
    nameModal: "Редагувати вакансію",
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
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
    content: <InfoModal type="logInSuccess" textColor={colorSuccess.text} />,
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
  saveAddVacancies: {
    content: <InfoModal type="saveAddVacancies" textColor={colorButton.text} />,
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },
  deleteVacancy: {
    content: <InfoModal type="deleteVacancy" textColor={colorButton.text} />,
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },
  arhiveVacancy: {
    content: <InfoModal type="arhiveVacancy" textColor={colorButton.text} />,
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },
  saveEditVacancies: {
    content: <InfoModal type="saveEditVacancies" textColor={colorButton.text} />,
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },
  close: {
    content: "close modal",
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },
};
