import { z } from "zod";

export const eventSchema = z.object({
  soonEventName: z.string().min(1, "Введіть назву події"),
  soonEventNotes: z.string().optional(),
  date: z.string().optional(),
  hours: z
    .string()
    .regex(/^\d{1,2}$/, "Години мають містити 1-2 цифри") // Дозволяємо 1-2 цифри
    .transform((val) => Number(val)) // Перетворюємо в число
    .refine((val) => val >= 0 && val <= 24, {
      message: "Години мають бути від 0 до 24",
    }),
  minutes: z
    .string()
    .regex(/^\d{1,2}$/, "Хвилини мають містити 1-2 цифри")
    .transform((val) => Number(val))
    .refine((val) => val >= 0 && val <= 59, {
      message: "Хвилини мають бути від 0 до 59",
    }),
});
