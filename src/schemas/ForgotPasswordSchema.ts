import { z } from "zod";

import { emailRegex } from "./regSchema";

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(4, `validation.emailMin`)
    .regex(emailRegex, `validation.emailInvalid`)
    .max(254, `validation.emailMax`)
    .trim(),
});
