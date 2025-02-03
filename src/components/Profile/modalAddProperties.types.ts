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
export const data: {
  [K in PropsModalAddProperties["cardsType"]]: DataItem;
} = {
  addPersonalProperties: {
    name: "Назва",
    placeholderName: "Вкажіть назву посилання",
    link: "Лінк на проєкт",
    placeholderLink: "Вставте лінк на посилання",
  },
  addProjects: {
    name: "Назва",
    placeholderName: "Вкажіть назву проєкту",
    technology: "Технолігії",
    placeholderTechnology: "Вкажіть технологій які використовували",
    link: "Лінк на проєкт",
    placeholderLink: "Вставте лінк на проєкт",
  },
  addResumes: {
    name: "Назва",
    placeholderName: "Вкажіть назву резюме",
    link: "Лінк на резюме",
    placeholderLink: "Вставте лінк на резюме",
  },
  addCoverLetters: {
    name: "Назва",
    placeholderName: "Вкажіть назву для листа",
    text: "Супровідний лист",
    placeholderLink: "Тут треба написати ваш лист",
  },
};
