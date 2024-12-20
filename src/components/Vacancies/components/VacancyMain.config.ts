// import { useMemo } from "react";
import { Vacancy } from "../../../store/slices/vacanciesSlice/vacanciesSlice.ts";

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
    return vacancies.filter(
        (v) => v.statuses[v.statuses.length - 1].name === statusName
    );
};

export const sectionsConfig: SectionConfig[] = [
    {
        sectionName: "saved",
        title: "Збережені",
        borderColor: "border-color5",
        backgroundColor: "bg-color5",
        backgroundTransparent: "bg-color5-transparent",
        hoverColor: "hover:bg-color5",
    },
    {
        sectionName: "resume",
        title: "Відправлені",
        borderColor: "border-color1",
        backgroundColor: "bg-color1",
        backgroundTransparent: "bg-color1-transparent",
        hoverColor: "hover:bg-color1",
    },
    {
        sectionName: "hr",
        title: "HR",
        borderColor: "border-color4",
        backgroundColor: "bg-color4",
        backgroundTransparent: "bg-color4-transparent",
        hoverColor: "hover:bg-color4",
    },
    {
        sectionName: "test",
        title: "Тестове завдання",
        borderColor: "border-color3",
        backgroundColor: "bg-color3",
        backgroundTransparent: "bg-color3-transparent",
        hoverColor: "hover:bg-color3",
    },
    {
        sectionName: "tech",
        title: "Технічна співбесіда",
        borderColor: "border-color6",
        backgroundColor: "bg-color6",
        backgroundTransparent: "bg-color6-transparent",
        hoverColor: "hover:bg-color6",
    },
    {
        sectionName: "reject",
        title: "Відмова",
        borderColor: "border-color2",
        backgroundColor: "bg-color2",
        backgroundTransparent: "bg-color2-transparent",
        hoverColor: "hover:bg-color2",
    },
    {
        sectionName: "offer",
        title: "Оффер",
        borderColor: "border-color7",
        backgroundColor: "bg-color7",
        backgroundTransparent: "bg-color7-transparent",
        hoverColor: "hover:bg-color7",
    },
];