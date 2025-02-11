import { z } from "zod";

import { emailRegex, emailRuByRegex } from "./regSchema";

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(4, `validation.emailMin`)
    .regex(emailRegex, `validation.emailInvalid`)
    .regex(emailRuByRegex, `validation.emailInvalidRuBy`)
    .max(254, `validation.emailMax`)
    .trim()
    .or(z.literal("")),
});
