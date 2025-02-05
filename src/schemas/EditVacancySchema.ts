import { z } from "zod";

export const EditVacancySchema = z.object({
  vacancy: z
    .string()
    .max(30, `addVacancySchema.position.max`)
    .min(2, `addVacancySchema.position.min`)
    .trim(),
  link: z
    .string()
    .url(`addVacancySchema.link.url`)
    .max(254, `addVacancySchema.link.max`)
    .min(4, `addVacancySchema.link.min`)
    .trim(),
  communication: z
    .string()
    .max(4000, `addVacancySchema.communication.max`)
    .min(10, `addVacancySchema.communication.min`)
    .trim(),
  company: z
    .string()
    .max(40, `addVacancySchema.company.max`)
    .min(2, `addVacancySchema.company.min`)
    .trim(),
  location: z
    .string()
    .max(400, `addVacancySchema.location.max`)
    .min(4, `addVacancySchema.location.min`)
    .trim(),
  work_type: z.enum(["remote", "office", "hybrid"], {
    errorMap: () => ({ message: "addVacancySchema.workType.invalid" }),
  }),
  note: z.string().max(4000, `addVacancySchema.notes.max`).trim(),
  isArchived: z.boolean(),
});

export const changeStatusVacancy = z.object({
  name: z.enum(["hr"]),
  rejectReason: z.string(),
  resumeId: z.string(),
  statusId: z.string(),
});
export type NewVacancyProps = z.infer<typeof EditVacancySchema>;

export type UpdateVacancyById = NewVacancyProps & { id: string };

export type ChangeStatusVacancy = z.infer<typeof changeStatusVacancy> & {
  vacancyId: string;
};
