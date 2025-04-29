import { PropsProfileCard } from "@/components/Profile/profileCardProps.props";
import { useTranslation } from "react-i18next";

export type PropsModalAddProperties = Pick<PropsProfileCard, "cardsType">;

export type DataItem = {
  name: string;
  placeholderName: string;
  technologies?: string;
  placeholderTechnology?: string;
  link?: string;
  placeholderLink?: string;
  text?: string;
  placeholderText?: string;
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
      placeholderName: t("modalAddProperties.placeholderNameProject"),
      technologies: t("modalAddProperties.technology"),
      placeholderTechnology: t("modalAddProperties.placeholderTechnology"),
      link: t("modalAddProperties.linkProject"),
      placeholderLink: t("modalAddProperties.placeholderlinkProject"),
      text: t("modalAddProperties.textProject"),
      placeholderText: t("modalAddProperties.placeholderTextProject"),
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
      placeholderText: t("modalAddProperties.placeholderTextCoverLetter"),
    },
  };

  return { data };
};
