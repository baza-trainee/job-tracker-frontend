import { z } from "zod";

import { emailRegex } from "./regSchema";

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .max(254, `validation.emailMax`)
    .regex(emailRegex, `validation.emailInvalid`)
    .min(4, `validation.emailMin`)
    .trim(),
});
