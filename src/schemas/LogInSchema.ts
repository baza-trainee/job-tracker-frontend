import { z } from "zod";

import { emailRegex, emailRuByRegex, passwordRegex } from "./regSchema";

export const LogInSchema = z.object({
  email: z
    .string()
    .max(254, `validation.emailMax`)
    .regex(emailRegex, `validation.emailInvalid`)
    .regex(emailRuByRegex, `validation.emailInvalidRuBy`)
    .min(4, `validation.emailMin`)
    .trim(),

  password: z
    .string()
    .max(14, `validation.passwordMax`)
    .regex(passwordRegex, `validation.passwordInvalid`)
    .min(8, `validation.passwordMin`),
});
