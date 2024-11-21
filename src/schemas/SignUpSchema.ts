import { z } from "zod";

import { emailRegex } from "./regSchema";
import { passwordRegex } from "./regSchema";

export const SignUpSchema = z
  .object({
    email: z
      .string()
      .max(254, `email повинен бути не більше 254 символів`)
      .regex(emailRegex, `Введіть коректний email`)
      .min(4, `email повинен бути не менше 4 символів`)
      .trim(),

    password: z
      .string()
      .max(14, `Пароль повинен бути не більше 14 символів`)
      .regex(passwordRegex, `Введіть коректний пароль`)
      .min(8, `Пароль повинен бути не менше 8 символів`),

    confirmPassword: z
      .string()
      .regex(passwordRegex, `Введіть коректний пароль`),

    terms: z.boolean().refine((value) => value === true, {
      message: "Ви не надайли згоду",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Паролі мають збігатись",
  });
