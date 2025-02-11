import { z } from "zod";

import { emailRegex } from "./regSchema";
import { nameRegex } from "./regSchema";
import { textContactUsRegex } from "./regSchema";

export const ContactUsSchema = z.object({
  name: z
    .string()
    .min(2, `Мінімальна довжина 2`)
    .regex(nameRegex, `Введіть коректне ім'я`)
    .max(30, `Максимальна довжина 30`)
    .trim()
    .or(z.literal("")),
  email: z
    .string()
    .min(4, `validation.emailMin`)
    .regex(emailRegex, `validation.emailInvalid`)
    .max(254, `validation.emailMax`)
    .trim()
    .or(z.literal("")),
  requestText: z
    .string()
    .min(10, `validation.emailMin`)
    .regex(textContactUsRegex, `Введіть коректний текст`)
    .max(4000, `validation.emailMax`)
    .trim()
    .or(z.literal("")),
});
