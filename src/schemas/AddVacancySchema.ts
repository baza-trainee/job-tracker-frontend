import { z } from "zod";
import { t } from "i18next";

export const AddVacancySchema = z.object({
  vacancy: z
    .string()
    .min(2, t("addVacancySchema.position.min"))
    .max(30, t("addVacancySchema.position.max"))
    .trim(),
  link: z
    .string()
    .url(t("addVacancySchema.link.url"))
    .min(4, t("addVacancySchema.link.min"))
    .max(254, t("addVacancySchema.link.max"))
    .trim(),
  communication: z
    .string()
    .min(10, t("addVacancySchema.communication.min"))
    .max(4000, t("addVacancySchema.communication.max"))
    .trim(),
  company: z
    .string()
    .min(2, t("addVacancySchema.company.min"))
    .max(40, t("addVacancySchema.company.max"))
    .trim(),
  location: z
    .string()
    .min(4, t("addVacancySchema.location.min"))
    .max(400, t("addVacancySchema.location.max"))
    .trim(),
  work_type: z.enum(["remote", "office", "hybrid"], {
    errorMap: () => ({ message: "addVacancySchema.workType.invalid" }),
  }),
  //alex
  resume: z.boolean(),
  reject: z.boolean(),
  resumeDropdown: z.string(),
  rejectDropdown: z.string(),

  note: z.string().max(4000, t("addVacancySchema.notes.max")).trim(),
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
