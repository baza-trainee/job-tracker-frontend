import { ForgotPassword } from "./components/formModals/ForgotPassword";
import ContactUs from "./components/formModals/ContacUs";
import InfoModal from "./components/infoModals/InfoModal";
import AddVacancy from "./components/addVacancyModals/AddVacancy";
import EditVacancy from "./components/editVacancy/EditVacancy";
import { Color, ContentMapProps } from "./ModalMain.types";
import ModalRemoveProperties from "../Profile/ModalRemoveProperties";
import AddEventModal from "../Soon/AddEventModal";
import ModalUpdateUserData from "../Profile/ModalUpdateUserData";
import ModalMuttionProfileData from "../Profile/ModalMuttionProfileData";

const colorDefault: Color = {
  text: "text-white",
  bg: "bg-white",
  border: "border-white",
};

const colorButton: Color = {
  text: "text-button",
  bg: "bg-button",
  border: "border-button",
};

const colorError: Color = {
  text: "text-color2",
  bg: "bg-color2",
  border: "border-color2",
};

const colorSuccess: Color = {
  text: "text-color8",
  bg: "bg-color8",
  border: "border-color8",
};

export const contentMap: ContentMapProps = {
  addVacancy: {
    content: <AddVacancy />,
    nameModal: "addVacancy.nameModal.name",
    bgColor: colorDefault.bg,
    borderColor: colorDefault.border,
  },
  editVacancy: {
    content: <EditVacancy />,
    nameModal: "editVacancy.nameModal.name",
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
    content: <InfoModal type="forgotPasswordSuccess" textColor={"textBlack"} />,
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
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
    content: (
      <InfoModal type="saveEditVacancies" textColor={colorButton.text} />
    ),
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },
  close: {
    content: "close modal",
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },
  addPersonalProperties: {
    content: <ModalMuttionProfileData cardsType="addPersonalProperties" />,
    nameModal: "addPersonalProperties.modalAddTitle",
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },
  addResumes: {
    content: <ModalMuttionProfileData cardsType="addResumes" />,
    nameModal: "addResumes.modalAddTitle",
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },
  addProjects: {
    content: <ModalMuttionProfileData cardsType="addProjects" />,
    nameModal: "addProjects.modalAddTitle",
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },
  addCoverLetters: {
    content: <ModalMuttionProfileData cardsType="addCoverLetters" />,
    nameModal: "addCoverLetters.modalAddTitle",
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },
  removePersonalProperties: {
    content: <ModalRemoveProperties cardsType="addPersonalProperties" />,
    nameModal: "Видалити персональні властивості",
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },
  removeProjects: {
    content: <ModalRemoveProperties cardsType="addProjects" />,
    nameModal: "Видалити проект",
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },
  removeCoverLetters: {
    content: <ModalRemoveProperties cardsType="addCoverLetters" />,
    nameModal: "Видалити супровідний лист",
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },
  removeResumes: {
    content: <ModalRemoveProperties cardsType="addResumes" />,
    nameModal: "Видалити резюме",
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },
  updateUserData: {
    content: <ModalUpdateUserData />,
    nameModal: "Оновити дані",
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },

  addEvent: {
    content: <AddEventModal />,
    nameModal: "soonSection.addEvent",
    bgColor: "bg-button",
    borderColor: "border-button",
    paddingAddEventModal: "pt-6 pr-10 pb-10 pl-10",
    iconAddEventModal: "h-8 w-8",
  },
};
