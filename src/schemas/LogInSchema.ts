import { z } from "zod";

import { emailRegex, emailRuByRegex, passwordRegex } from "./regSchema";

export const LogInSchema = z.object({
  email: z
    .string()
    .min(4, `validation.emailMin`)
    .regex(emailRegex, `validation.emailInvalid`)
    .regex(emailRuByRegex, `validation.emailInvalidRuBy`)
    .max(254, `validation.emailMax`)
    .trim(),

  password: z
    .string()
    // .min(8, `validation.passwordMin`)
    .regex(passwordRegex, `validation.passwordInvalid`)
    .max(14, `validation.passwordMax`)
    .trim(),
});
