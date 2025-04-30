import { TypesModal } from "../modal/ModalMain.types";

export type PropsProfileCard = {
  cardsType: Extract<
    TypesModal,
    "addPersonalProperties" | "addProjects" | "addResumes" | "addCoverLetters"
  >;
  className?: string;
};
