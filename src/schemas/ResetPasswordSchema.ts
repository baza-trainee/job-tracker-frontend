import { z } from "zod";

import { passwordRegex } from "./regSchema";

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, `validation.passwordMin`)
      .regex(passwordRegex, `validation.passwordInvalid`)
      .max(14, `validation.passwordMax`)
      .or(z.literal("")),

    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      if (data.confirmPassword.length === 0) return true;
      return data.password === data.confirmPassword;
    },
    {
      path: ["confirmPassword"],
      message: `validation.passwordMismatch`,
    }
  );
