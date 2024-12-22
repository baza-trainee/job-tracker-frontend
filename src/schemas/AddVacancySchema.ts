import { z } from "zod";
import { t } from "i18next";

export const AddVacancySchema = z.object({
  vacancy: z
    .string()
    .max(30, t("addVacancySchema.position.max"))
    .min(2, t("addVacancySchema.position.min"))
    .trim(),
  link: z
    .string()
    .url(t("addVacancySchema.link.url"))
    .max(254, t("addVacancySchema.link.max"))
    .min(4, t("addVacancySchema.link.min"))
    .trim(),
  communication: z
    .string()
    .max(4000, t("addVacancySchema.communication.max"))
    .min(10, t("addVacancySchema.communication.min"))
    .trim(),
  company: z
    .string()
    .max(40, t("addVacancySchema.company.max"))
    .min(2, t("addVacancySchema.company.min"))
    .trim(),
  location: z
    .string()
    .max(400, t("addVacancySchema.location.max"))
    .min(4, t("addVacancySchema.location.min"))
    .trim(),
  work_type: z.enum(["remote", "office", "mixed"], {
    errorMap: () => ({ message: "addVacancySchema.workType.invalid" }),
  }),
  note: z.string().max(4000, t("addVacancySchema.notes.max")).trim(),
  isArchived: z.boolean(),
});

export const changeStatusVacancy = z.object({
  name: z.enum(["hr"]),
  rejectReason: z.string(),
  resumeId: z.string(),
  statusId: z.string(),
});
export type NewVacancyProps = z.infer<typeof AddVacancySchema>;

export type UpdateVacancyById = NewVacancyProps & { id: string };

export type ChangeStatusVacancy = z.infer<typeof changeStatusVacancy> & {
  vacancyId: string;
};
// const vacancyFromSwager = {
//   vacancy: "Senior TypeScript Developer",
//   link: "https://example.com/job-posting",
//   communication: "Contact John Doe at john@company.com",
//   company: "string",
//   location: "string",
//   work_type: "remote",
//   note: "string",
// };

// const changeStatusFromSwager = {
//   name: "hr",
//   rejectReason: "SoftSkills",
//   resumeId: "123e4567-e89b-12d3-a456-426614174000",
//   statusId: "123e4567-e89b-12d3-a456-426614174000",
// };
