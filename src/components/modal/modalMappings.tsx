import { ForgotPassword } from "./components/formModals/ForgotPassword";
import ContactUs from "./components/formModals/ContactUs";
import InfoModal from "./components/infoModals/InfoModal";
import AddVacancy from "./components/addVacancyModals/AddVacancy";
import EditVacancy from "./components/editVacancy/EditVacancy";
import { Color, ContentMapProps } from "./ModalMain.types";
import AddEventModal from "../Soon/AddEventModal";
import EditEventModal from "../Soon/EditEventModal";
import ModalRemoveAccount from "./components/profileModals/ModalRemoveAccount";
import ModalMuttionProfileData from "./components/profileModals/ModalMuttionProfileData";
import ModalRemoveProperties from "./components/profileModals/ModalRemoveProperties";

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
  restoreVacancy: {
    content: <InfoModal type="restoreVacancy" textColor={colorButton.text} />,
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
    nameModal: "modalAddProperties.modalRemoveLink",
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },
  removeProjects: {
    content: <ModalRemoveProperties cardsType="addProjects" />,
    nameModal: "modalAddProperties.modalRemoveProject",
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },
  removeCoverLetters: {
    content: <ModalRemoveProperties cardsType="addCoverLetters" />,
    nameModal: "modalAddProperties.modalRemoveCoverLetter",
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },
  removeResumes: {
    content: <ModalRemoveProperties cardsType="addResumes" />,
    nameModal: "modalAddProperties.modalRemoveResume",
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },
  removeAccount: {
    content: <ModalRemoveAccount />,
    nameModal: "modalAddProperties.removeAccountModalName",
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },

  addEvent: {
    content: <AddEventModal />,
    nameModal: "soonSection.addEvent",
    bgColor: "bg-button",
    borderColor: "border-button",
    paddingAddEventModal:
      "pt-2 pr-2 pb-4 pl-2 md:pt-4 md:pr-4 md:pb-4 md:pl-4 xl:pt-4 xl:pr-6 xl:pb-8 xl:pl-6 3xl:pt-6 3xl:pr-10 3xl:pb-10 3xl:pl-10",
    iconCloseEventModal: "h-8 w-8 md:w-6 md:h-6 3xl:h-8 3xl:w-8",
  },
  editEvent: {
    content: <EditEventModal />,
    nameModal: "soonSection.editEvent",
    bgColor: "bg-button",
    borderColor: "border-button",
    paddingAddEventModal:
      "pt-2 pr-2 pb-4 pl-2 md:pt-4 md:pr-4 md:pb-4 md:pl-4 xl:pt-4 xl:pr-6 xl:pb-8 xl:pl-6 3xl:pt-6 3xl:pr-10 3xl:pb-10 3xl:pl-10",
    iconCloseEventModal: "h-8 w-8 md:w-6 md:h-6 3xl:h-8 3xl:w-8",
  },
  saveAddEvent: {
    content: <InfoModal type="saveAddEvent" textColor={colorButton.text} />,
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },
  saveEditEvent: {
    content: <InfoModal type="saveEditEvent" textColor={colorButton.text} />,
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },
  deleteEvent: {
    content: <InfoModal type="deleteEvent" textColor={colorButton.text} />,
    bgColor: colorButton.bg,
    borderColor: colorButton.border,
  },
};
