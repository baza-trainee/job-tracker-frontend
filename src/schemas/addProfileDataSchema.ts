// import { z } from "@/utils/i18n/i18n";

import { PropsModalAddProperties } from "@/components/modal/components/profileModals/modalAddProperties.types";
import { z, ZodObject, ZodOptional, ZodString } from "zod";

type Schema = {
  [K in PropsModalAddProperties["cardsType"]]: ZodObject<{
    name: ZodString;
    technologies: ZodOptional<ZodString>;
    link: ZodOptional<ZodString>;
    text: ZodOptional<ZodString>;
  }>;
};

export const addProfileData: Schema = {
  addResumes: z.object({
    name: z
      .string()
      .min(2, {
        message: "validation.min2Characters",
      })
      .trim(),
    technologies: z.string().optional(),
    link: z
      .string()
      .url({ message: "validation.invalidUrl" })
      // .regex(/\.pdf$/, {
      //   message: "validation.invalidPdf",
      // })
      .trim()
      .optional(),
    text: z.string().optional(),
  }),

  addProjects: z.object({
    name: z.string().min(2, { message: "validation.min2Characters" }).trim(),
    technologies: z.string().trim().optional(),
    link: z
      .string()
      .url({ message: "validation.invalidUrl" })
      .regex(/\.[a-zA-Z]{2,}$/, { message: "validation.invalidUrl" })
      .trim()
      .optional(),
    text: z.string().optional(),
  }),
  addCoverLetters: z.object({
    name: z.string().min(2, { message: "validation.min2Characters" }).trim(),
    technologies: z.string().optional(),
    link: z.string().optional(),
    text: z
      .string()
      .min(2, { message: "validation.min2Characters" })
      .trim()
      .optional(),
  }),
  addPersonalProperties: z.object({
    name: z.string().min(2, { message: "validation.min2Characters" }).trim(),
    technologies: z
      .string()
      .min(2, { message: "validation.min2Characters" })
      .trim()
      .optional(),
    link: z
      .string()
      .trim()
      .url({ message: "validation.invalidUrl" })
      .regex(/\.[a-zA-Z]{2,}$/, {
        message: "validation.invalidUrl",
      })
      .optional(),
    text: z
      .string()
      .min(2, { message: "validation.min2Characters" })
      .trim()
      .optional(),
  }),
};
