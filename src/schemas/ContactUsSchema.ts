import { z } from "zod";

import { emailRegex } from "./regSchema";
import { nameRegex } from "./regSchema";
import { textContactUsRegex } from "./regSchema";

export const ContactUsSchema = z.object({
  name: z
    .string()
    .max(30, `Максимальна довжина 30`)
    .regex(nameRegex, `Введіть коректне ім'я`)
    .min(2, `Мінімальна довжина 2`)
    .trim(),
  email: z
    .string()
    .max(254, `validation.emailMax`)
    .regex(emailRegex, `validation.emailInvalid`)
    .min(4, `validation.emailMin`)
    .trim(),
  requestText: z
    .string()
    .max(4000, `validation.emailMax`)
    .regex(textContactUsRegex, `Введіть коректний текст`)
    .min(10, `validation.emailMin`)
    .trim(),
});
