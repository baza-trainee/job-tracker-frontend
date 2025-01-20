import { PropsModalAddProperties } from "@/components/Profile/modalAddProperties.types";
import { z, ZodObject, ZodOptional, ZodString } from "zod";

type Schema = {
  [K in PropsModalAddProperties["cardsType"]]: ZodObject<{
    name: ZodString;
    technology: ZodOptional<ZodString>;
    link: ZodString;
  }>;
};

export const addProfileData: Schema = {
  addResumes: z.object({
    name: z.string().min(2, { message: "Мінімум 2 символи" }).trim(),
    technology: z
      .string()
      //   .min(2, { message: "Мінімум 2 символи" })
      //   .trim()
      .optional(),
    link: z
      .string()
      .url({ message: "Введіть коректне посилання http... " })
      .regex(/\.pdf$/, { message: "Посилання має закінчуватися на .pdf" })
      .trim(),
  }),

  addProjects: z.object({
    name: z.string().min(2, { message: "Мінімум 2 символи" }).trim(),
    technology: z
      .string()
      .url({ message: "Введіть коректне github progect посилання http..." })
      .regex(/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/, {
        message:
          "Посилання повинно відповідати формату GitHub репозиторію (https://github.com/username..../repository)",
      })
      .trim()
      .optional(),
    link: z
      .string()
      .url({ message: "Введіть коректне посилання http..." })
      .regex(/\.com*$/, { message: "закінчується на ...com" })
      .trim(),
  }),
  addCoverLetters: z.object({
    name: z.string().min(2, { message: "Мінімум 2 символи" }).trim(),
    technology: z
      .string()
      .min(2, { message: "Мінімум 2 символи" })
      .trim()
      .optional(),
    link: z.string().min(2, { message: "Мінімум 2 символи" }).trim(),
  }),
  addPersonalProperties: z.object({
    name: z.string().min(2, { message: "Мінімум 2 символи" }).trim(),
    technology: z
      .string()
      .min(2, { message: "Мінімум 2 символи" })
      .trim()
      .optional(),
    link: z.string().url({ message: "Введіть коректне посилання" }).trim(),
  }),
};
