import { z } from "zod";

import { passwordRegex } from "./regSchema";

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .max(14, `validation.passwordMax`)
      .regex(passwordRegex, `validation.passwordInvalid`)
      .min(8, `validation.passwordMin`),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: `validation.passwordMismatch`,
  });
