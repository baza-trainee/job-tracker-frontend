import { z } from "zod";

import { passwordRegex } from "./regSchema";

export const LogInSchema = z.object({
  email: z.string().trim(),

  password: z
    .string()
    .min(8, `validation.passwordMin`)
    .regex(passwordRegex, `validation.passwordInvalid`)
    .max(14, `validation.passwordMax`)
    .trim(),
});
