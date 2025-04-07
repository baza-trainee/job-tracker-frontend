import { z } from "zod";
import { useTranslation } from "react-i18next";

export const getEventSchema = () => {
  const { t } = useTranslation();

  return z.object({
    soonEventName: z
      .string()
      .min(1, t("soonSection.soonModalNameLength"))
      .max(50, t("soonSection.soonModalNameLength")),
    soonEventNotes: z
      .string()
      .max(1000, t("soonSection.soonModalNotes"))
      .optional(),
    date: z
      .string()
      .refine(
        (date) => {
          const selectedDate = new Date(date);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return selectedDate >= today;
        },
        {
          message: t("soonSection.invalidPastDate"),
        }
      )
      .optional(),
    hours: z
      // .number({ required_error: t("soonSection.requiredHours") }) // Обов’язкове число
      // .min(0, t("soonSection.invalidHours"))
      // .max(23, t("soonSection.invalidHours")),
      .union([z.string(), z.number()])
      // .string()
      // .regex(/^\d{1,2}$/, t("soonSection.invalidTimeContents")) // Дозволяємо 1-2 цифри
      .transform((val) => Number(val)) // Перетворюємо в число
      .refine((val) => val >= 0 && val <= 23, {
        message: t("soonSection.invalidHours"),
      }),
    minutes: z
      // .number({ required_error: t("soonSection.requiredMinutes") }) // Обов’язкове число
      // .min(0, t("soonSection.invalidMinutes"))
      // .max(59, t("soonSection.invalidMinutes"))
      .union([z.string(), z.number()])
      // .string()
      // .regex(/^\d{1,2}$/, t("soonSection.invalidTimeContents"))
      .transform((val) => Number(val))
      .refine((val) => val >= 0 && val <= 59, {
        message: t("soonSection.invalidMinutes"),
      })
      .optional()
      .default(0),
  });
};

// hours: z
//   .number({
//     required_error: "Введіть годину",
//     invalid_type_error: "Година повинна бути числом",
//   })
//   .min(0, "Година не може бути меншою за 0")
//   .max(23, "Година не може бути більшою за 23")
