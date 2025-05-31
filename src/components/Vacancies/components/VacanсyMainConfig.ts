import i18n from "i18next";
import { Vacancy, VacancyStatus } from "../../../types/vacancies.types";

export type SectionConfig = {
  sectionName: string;
  title: string;
  borderColor: string;
  backgroundColor: string;
  backgroundTransparent: string;
  hoverColor: string;
};

export const cleanStatuses = (statuses: VacancyStatus[]): VacancyStatus[] =>
  statuses.length > 1 ? statuses.filter((s) => s.name !== "saved") : statuses;

export const getVacanciesByStatus = (
  vacancies: Vacancy[],
  statusName: string
): Vacancy[] => {
  return vacancies
    .map((v) => ({ ...v, statuses: cleanStatuses(v.statuses) }))
    .filter((v) => v.statuses[0].name === statusName);
};

// export const sectionsConfig: SectionConfig[] = [
export const getSectionsConfig = (darkTheme: boolean): SectionConfig[] => [
  {
    sectionName: "saved",
    title: "sortDropdown.saved",
    borderColor: "border-color5",
    backgroundColor: "bg-color5",
    backgroundTransparent: darkTheme ? "bg-color5" : "bg-color5-transparent",
    hoverColor: darkTheme ? "hover:bg-color5-transparent" : "hover:bg-color5",
  },
  {
    sectionName: "resume",
    title: "sortDropdown.resume",
    borderColor: "border-color1",
    backgroundColor: "bg-color1",
    backgroundTransparent: darkTheme ? "bg-color1" : "bg-color1-transparent",
    hoverColor: darkTheme ? "hover:bg-color1-transparent" : "hover:bg-color1",
  },
  {
    sectionName: "hr",
    title: "sortDropdown.hr",
    borderColor: "border-color4",
    backgroundColor: "bg-color4",
    backgroundTransparent: darkTheme ? "bg-color4" : "bg-color4-transparent",
    hoverColor: darkTheme ? "hover:bg-color4-transparent" : "hover:bg-color4",
  },
  {
    sectionName: "test",
    title: "sortDropdown.test",
    borderColor: "border-color3",
    backgroundColor: "bg-color3",
    backgroundTransparent: darkTheme ? "bg-color3" : "bg-color3-transparent",
    hoverColor: darkTheme ? "hover:bg-color3-transparent" : "hover:bg-color3",
  },
  {
    sectionName: "tech",
    title: "sortDropdown.tech",
    borderColor: "border-color6",
    backgroundColor: "bg-color6",
    backgroundTransparent: darkTheme ? "bg-color6" : "bg-color6-transparent",
    hoverColor: darkTheme ? "hover:bg-color6-transparent" : "hover:bg-color6",
  },
  {
    sectionName: "reject",
    title: "sortDropdown.reject",
    borderColor: "border-color2",
    backgroundColor: "bg-color2",
    backgroundTransparent: darkTheme ? "bg-color2" : "bg-color2-transparent",
    hoverColor: darkTheme ? "hover:bg-color2-transparent" : "hover:bg-color2",
  },
  {
    sectionName: "offer",
    title: "sortDropdown.offer",
    borderColor: "border-color7",
    backgroundColor: "bg-color7",
    backgroundTransparent: darkTheme ? "bg-color7" : "bg-color7-transparent",
    hoverColor: darkTheme ? "hover:bg-color7-transparent" : "hover:bg-color7",
  },
];

export const getLocalizedSectionConfig = (
  darkTheme: boolean
): SectionConfig[] => {
  return getSectionsConfig(darkTheme).map((section) => ({
    ...section,
    title: i18n.t(section.title),
  }));
};
