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
      .union([z.string(), z.number()])
      // .transform((val) => Number(val)) // Перетворюємо в число
      .transform((val) => {
        if (val === "" || val === undefined || val === null) return undefined;
        return Number(val);
      })
      .refine(
        (val) =>
          val !== undefined &&
          typeof val === "number" &&
          !isNaN(val) &&
          val >= 0 &&
          val <= 23,
        {
          message: t("soonSection.invalidHours"),
        }
      ),
    minutes: z
      .union([z.string(), z.number()])
      .transform((val) => Number(val))
      .refine((val) => val >= 0 && val <= 59, {
        message: t("soonSection.invalidMinutes"),
      })
      .optional()
      .default(0),
  });
};
