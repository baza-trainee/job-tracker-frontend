import i18n from "i18next";
import { Vacancy } from "../../../types/vacancies.types";

export type SectionConfig = {
  sectionName: string;
  title: string;
  borderColor: string;
  backgroundColor: string;
  backgroundTransparent: string;
  hoverColor: string;
};

export const getVacanciesByStatus = (
  vacancies: Vacancy[],
  statusName: string
): Vacancy[] => {
  return vacancies.filter((v) => v.statuses[0].name === statusName);
};

export const sectionsConfig: SectionConfig[] = [
  {
    sectionName: "saved",
    title: "sortDropdown.saved",
    borderColor: "border-color5",
    backgroundColor: "bg-color5",
    backgroundTransparent: "bg-color5-transparent",
    hoverColor: "hover:bg-color5",
  },
  {
    sectionName: "resume",
    title: "sortDropdown.sent",
    borderColor: "border-color1",
    backgroundColor: "bg-color1",
    backgroundTransparent: "bg-color1-transparent",
    hoverColor: "hover:bg-color1",
  },
  {
    sectionName: "hr",
    title: "sortDropdown.hrInterview",
    borderColor: "border-color4",
    backgroundColor: "bg-color4",
    backgroundTransparent: "bg-color4-transparent",
    hoverColor: "hover:bg-color4",
  },
  {
    sectionName: "test",
    title: "sortDropdown.testTask",
    borderColor: "border-color3",
    backgroundColor: "bg-color3",
    backgroundTransparent: "bg-color3-transparent",
    hoverColor: "hover:bg-color3",
  },
  {
    sectionName: "tech",
    title: "sortDropdown.techInterview",
    borderColor: "border-color6",
    backgroundColor: "bg-color6",
    backgroundTransparent: "bg-color6-transparent",
    hoverColor: "hover:bg-color6",
  },
  {
    sectionName: "reject",
    title: "sortDropdown.rejection",
    borderColor: "border-color2",
    backgroundColor: "bg-color2",
    backgroundTransparent: "bg-color2-transparent",
    hoverColor: "hover:bg-color2",
  },
  {
    sectionName: "offer",
    title: "sortDropdown.offer",
    borderColor: "border-color7",
    backgroundColor: "bg-color7",
    backgroundTransparent: "bg-color7-transparent",
    hoverColor: "hover:bg-color7",
  },
];

export const getLocalizedSectionConfig = (): SectionConfig[] => {
  return sectionsConfig.map((section) => ({
    ...section,
    title: i18n.t(section.title),
  }));
};
