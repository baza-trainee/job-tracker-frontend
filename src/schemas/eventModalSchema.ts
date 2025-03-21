import { z } from "zod";
import { useTranslation } from "react-i18next";

export const getEventSchema = () => {
  const { t } = useTranslation();

  return z.object({
    soonEventName: z.string().min(1, t("soonSection.soonModalPlaceholderName")),
    soonEventNotes: z.string().optional(),
    date: z.string().optional(),
    hours: z
      .string()
      .regex(/^\d{1,2}$/, t("soonSection.invalidTimeContents")) // Дозволяємо 1-2 цифри
      .transform((val) => Number(val)) // Перетворюємо в число
      .refine((val) => val >= 0 && val <= 24, {
        message: t("soonSection.invalidHours"),
      }),
    minutes: z
      .string()
      .regex(/^\d{1,2}$/, t("soonSection.invalidTimeContents"))
      .transform((val) => Number(val))
      .refine((val) => val >= 0 && val <= 59, {
        message: t("soonSection.invalidMinutes"),
      }),
  });
};
