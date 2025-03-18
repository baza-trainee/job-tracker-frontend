import { z } from "zod";

export const AddVacancySchema = z
  .object({
    vacancy: z
      .string()
      .min(2, `addVacancySchema.position.min`)
      .max(30, `addVacancySchema.position.max`)
      // .trim().or(z.literal("")),
      .trim(),
    link: z
      .string()
      .url(`addVacancySchema.link.url`)
      .min(4, `addVacancySchema.link.min`)
      .max(254, `addVacancySchema.link.max`)
      .trim(),
    communication: z
      .string()
      .min(10, `addVacancySchema.communication.min`)
      .max(4000, `addVacancySchema.communication.max`)
      .trim(),
    company: z
      .string()
      .min(2, `addVacancySchema.company.min`)
      .max(40, `addVacancySchema.company.max`)
      .trim(),
    location: z
      .string()
      .min(4, `addVacancySchema.location.min`)
      .max(400, `addVacancySchema.location.max`)
      .trim(),
    work_type: z.enum(["remote", "office", "hybrid"], {
      errorMap: () => ({ message: "addVacancySchema.workType.invalid" }),
    }),
    resume: z.boolean(),
    reject: z.boolean(),
    resumeDropdown: z.string(),
    rejectDropdown: z.string(),

    note: z.string().max(4000, `addVacancySchema.notes.max`).trim(),
    isArchived: z.boolean(),
  })
  .refine((data) => !(data.resume && !data.resumeDropdown), {
    path: ["resumeDropdown"],
    message: "Оберіть резюме",
  })
  .refine((data) => !(data.reject && !data.rejectDropdown), {
    path: ["rejectDropdown"],
    message: "Оберіть причину відмови",
  });

export const changeStatusVacancy = z.object({
  name: z.enum(["hr"]),
  rejectReason: z.string(),
  resumeId: z.string(),
  statusId: z.string(),
});
