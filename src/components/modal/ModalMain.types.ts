export type TypesModal =
  | "addVacancy"
  | "editVacancy"
  | "forgotPassword"
  | "contactUs"
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
  | "restoreVacancy"
  | "saveEditVacancies"
  | "close"
  | "addPersonalProperties"
  | "addProjects"
  | "addResumes"
  | "addCoverLetters"
  | "editPersonalProperties"
  | "editProjects"
  | "editResumes"
  | "editCoverLetters"
  | "removePersonalProperties"
  | "removeProjects"
  | "removeResumes"
  | "removeCoverLetters"
  | "removeAccount"
  | "addEvent"
  | "editEvent"
  | "saveAddEvent"
  | "saveEditEvent"
  | "deleteEvent"
  | "addNote"
  | "saveNote"
  | "deleteNote"
  | "updateNote"
  | "confirmToRemove"
  | "closeModalsaveEditVacancies"
  | "closeModalsaveEditEvent"
  | "closeModalsaveAddEvent"
  | "closeDiscardModal"
  | "updateResumes"
  | "updateProjects"
  | "updateCoverLetters"
  | "updatePersonalProperties";

export type Color = {
  text: "text-textWhite" | "text-button" | "text-color2" | "text-color8";
  bg: "bg-whiteColor" | "bg-button" | "bg-color2" | "bg-color8";
  border:
    | "border-textWhite"
    | "border-button"
    | "border-color2"
    | "border-color8";
};

export type ContentMapProps = {
  [K in TypesModal]: {
    content: React.ReactNode;
    nameModal?: string;
    bgColor: Color["bg"];
    borderColor: Color["border"];
    paddingAddEventModal?: string;
    iconCloseEventModal?: string;
  };
};
