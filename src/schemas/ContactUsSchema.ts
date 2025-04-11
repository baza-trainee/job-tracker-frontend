import { z } from "zod";

import { emailRegex } from "./regSchema";
import { nameRegex } from "./regSchema";
import { textContactUsRegex } from "./regSchema";

export const ContactUsSchema = z.object({
  name: z
    .string()
    .min(2, `contactUs.nameValidation.min`)
    .regex(nameRegex, `Введіть коректне ім'я`)
    .max(30, `contactUs.nameValidation.max`)
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
    .min(10, `contactUs.textValidation.min`)
    .regex(textContactUsRegex, `Введіть коректний текст`)
    .max(4000, `contactUs.textValidation.max`)
    .trim()
    .or(z.literal("")),
});
