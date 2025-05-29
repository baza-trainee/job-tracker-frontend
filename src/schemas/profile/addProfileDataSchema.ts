import { PropsModalAddProperties } from "@/components/modal/components/profileModals/modalAddProperties.types";
import { z, ZodObject, ZodString } from "zod";

type Schema = {
  [K in PropsModalAddProperties["cardsType"]]: ZodObject<{
    name: ZodString;
    technologies: ZodString;
    link: ZodString;
    text: any;
  }>;
};

export const addProfileData: Schema = {
  addResumes: z.object({
    name: z
      .string()
      .min(2, {
        message: "validation.min2Characters",
      })
      .max(50, { message: "validation.max50Characters" })
      .trim(),
    technologies: z.string(),
    link: z
      .string()
      .regex(/^https?:\/\/[a-zA-Z0-9-]{1,}(\.[a-zA-Z0-9-]{2,})+(\/[^\s]*)?$/, {
        message: "validation.invalidUrl",
      })
      .trim(),
    text: z.string().optional(),
  }),

  addProjects: z.object({
    name: z
      .string()
      .min(2, { message: "validation.min2Characters" })
      .max(50, { message: "validation.max50Characters" })
      .trim(),
    technologies: z
      .string()
      .trim()
      .min(2, { message: "validation.min2Characters" }),
    link: z
      .string()
      .regex(/^https?:\/\/[a-zA-Z0-9-]{1,}(\.[a-zA-Z0-9-]{2,})+(\/[^\s]*)?$/, {
        message: "validation.invalidUrl",
      })
      .trim(),
    text: z.string().min(2, { message: "validation.min2Characters" }).trim(),
  }),
  addCoverLetters: z.object({
    name: z
      .string()
      .min(2, { message: "validation.min2Characters" })
      .max(50, { message: "validation.max50Characters" })
      .trim(),
    technologies: z.string(),
    link: z.string(),
    text: z
      .string()
      .trim()
      .regex(/^.{2,}$/, { message: "validation.min2Characters" }),
  }),
  addPersonalProperties: z.object({
    name: z
      .string()
      .min(2, { message: "validation.min2Characters" })
      .max(50, { message: "validation.max50Characters" })
      .trim(),
    technologies: z
      .string()
      .min(2, { message: "validation.min2Characters" })
      .trim(),
    link: z
      .string()
      .trim()
      .regex(/^https?:\/\/[a-zA-Z0-9-]{1,}(\.[a-zA-Z0-9-]{2,})+(\/[^\s]*)?$/, {
        message: "validation.invalidUrl",
      }),
    text: z
      .string()
      .trim()
      .regex(/^.{2,}$/, { message: "validation.min2Characters" }),
  }),
};
