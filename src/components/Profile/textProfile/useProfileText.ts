import { useTranslation } from "react-i18next";
import { PropsProfileCard } from "../profileCardProps.props";

const useProfileTexts = ({ cardsType }: PropsProfileCard) => {
  const { t } = useTranslation();

  const profileTexts = {
    addCoverLetters: {
      cardTitle: t("addCoverLetters.cardTitle"),
      buttonAdd: t("addCoverLetters.buttonAdd"),
      modalAddTitle: t("addCoverLetters.modalAddTitle"),
    },
    addProjects: {
      cardTitle: t("addProjects.cardTitle"),
      buttonAdd: t("addProjects.buttonAdd"),
      modalAddTitle: t("addProjects.modalAddTitle"),
    },
    addResumes: {
      cardTitle: t("addResumes.cardTitle"),
      buttonAdd: t("addResumes.buttonAdd"),
      modalAddTitle: t("addResumes.modalAddTitle"),
    },
    addPersonalProperties: {
      cardTitle: t("addPersonalProperties.cardTitle"),
      buttonAdd: t("addPersonalProperties.buttonAdd"),
      modalAddTitle: t("addPersonalProperties.modalAddTitle"),
    },
  };

  return profileTexts[cardsType];
};

export default useProfileTexts;
