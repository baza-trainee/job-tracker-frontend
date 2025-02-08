import { useTranslation } from "react-i18next";
import { PropsProfileCard } from "./profileCardProps.props";

export type PropsModalAddProperties = Pick<PropsProfileCard, "cardsType">;

export type DataItem = {
  name: string;
  placeholderName: string;
  technology?: string;
  placeholderTechnology?: string;
  link?: string;
  text?: string;
  placeholderLink: string;
};

export type DataUpdateItem = { id: string } & DataItem;

export const useData = () => {
  const { t } = useTranslation();
  const data: {
    [K in PropsModalAddProperties["cardsType"]]: DataItem;
  } = {
    addPersonalProperties: {
      name: t("modalAddProperties.linkName"),
      placeholderName: t("modalAddProperties.placeHolderSocials"),
      link: t("modalAddProperties.linkSocial"),
      placeholderLink: t("modalAddProperties.placeholderlinkSocial"),
    },
    addProjects: {
      name: t("modalAddProperties.linkName"),
      placeholderName: "Вкажіть назву проєкту",
      technology: "Технолігії",
      placeholderTechnology: "Вкажіть технологій які використовували",
      link: "Лінк на проєкт",
      placeholderLink: "Вставте лінк на проєкт",
    },
    addResumes: {
      name: t("modalAddProperties.linkName"),
      placeholderName: t("modalAddProperties.placeholderNameResume"),
      link: t("modalAddProperties.linkResume"),
      placeholderLink: t("modalAddProperties.placeholderLinkResume"),
    },
    addCoverLetters: {
      name: t("modalAddProperties.linkName"),
      placeholderName: t("modalAddProperties.placeholderNameCoverLetter"),
      text: t("modalAddProperties.textNameCoverLetter"),
      placeholderLink: t("modalAddProperties.placeholderTextCoverLetter"),
    },
  };

  return { data };
};
