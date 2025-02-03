import { PropsModalAddProperties } from "@/components/Profile/modalAddProperties.types";
import { z, ZodObject, ZodOptional, ZodString } from "zod";

type Schema = {
  [K in PropsModalAddProperties["cardsType"]]: ZodObject<{
    name: ZodString;
    technology: ZodOptional<ZodString>;
    link: ZodOptional<ZodString>;
    text: ZodOptional<ZodString>;
  }>;
};

export const addProfileData: Schema = {
  addResumes: z.object({
    name: z.string().min(2, { message: "Мінімум 2 символи" }).trim(),
    technology: z.string().optional(),
    link: z
      .string()
      .url({ message: "Введіть коректне посилання http... " })
      .regex(/\.pdf$/, { message: "Посилання має закінчуватися на .pdf" })
      .trim()
      .optional(),
    text: z.string().optional(),
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
      .trim()
      .optional(),
    text: z.string().optional(),
  }),
  addCoverLetters: z.object({
    name: z.string().min(2, { message: "Мінімум 2 символи" }).trim(),
    technology: z.string().optional(),
    link: z.string().optional(),
    text: z.string().min(2, { message: "Мінімум 2 символи" }).trim().optional(),
  }),
  addPersonalProperties: z.object({
    name: z.string().min(2, { message: "Мінімум 2 символи" }).trim(),
    technology: z
      .string()
      .min(2, { message: "Мінімум 2 символи" })
      .trim()
      .optional(),
    link: z
      .string()
      .trim()
      .url({ message: "Введіть коректне посилання" })
      .regex(/\.[a-zA-Z]{2,}$/, {
        message: "повинно містити дві літери після крапки",
      })
      .optional(),
    text: z.string().min(2, { message: "Мінімум 2 символи" }).trim().optional(),
  }),
};
