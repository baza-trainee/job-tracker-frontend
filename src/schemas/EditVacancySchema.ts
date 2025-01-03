import { z } from "zod";
import { t } from "i18next";

export const EditVacancySchema = z.object({
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
  work_type: z.enum(["remote", "office", "hybrid"], {
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
export type NewVacancyProps = z.infer<typeof EditVacancySchema>;

export type UpdateVacancyById = NewVacancyProps & { id: string };

export type ChangeStatusVacancy = z.infer<typeof changeStatusVacancy> & {
  vacancyId: string;
};
