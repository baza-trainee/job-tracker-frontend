import { z } from "zod";

// потрібно зробити валідацію
export const AddVacancySchema = z.object({
    company: z
        .string()
        .max(40, `Максимальна довжина 40`)
        .min(2, `Мінімальна довжина 2`)
        .trim(),
    position: z
        .string()
        .max(30, `Максимальна довжина 30`)
        .min(2, `Мінімальна довжина 2`)
        .trim(),
    link: z
        .string()
        .max(254, `validation.emailMax`)
        .min(4, `validation.emailMin`)
        .trim(),
    communication: z
        .string()
        .max(4000, `validation.emailMax`)
        .min(10, `validation.emailMin`)
        .trim(),
    location: z
        .string()
        .max(4000, `validation.emailMax`)
        .min(10, `validation.emailMin`)
        .trim(),
});
