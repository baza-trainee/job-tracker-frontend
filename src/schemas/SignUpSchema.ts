import { z } from "zod";

import { emailRegex, emailRuByRegex, passwordRegex } from "./regSchema";

export const SignUpSchema = z
  .object({
    email: z
      .string()
      .min(4, `validation.emailMin`)
      .regex(emailRegex, `validation.emailInvalid`)
      .regex(emailRuByRegex, `validation.emailInvalidRuBy`)
      .max(254, `validation.emailMax`)
      .trim()
      .or(z.literal("")),

    password: z
      .string()
      .min(8, `validation.passwordMin`)
      .regex(passwordRegex, `validation.passwordInvalid`)
      .max(14, `validation.passwordMax`)
      .or(z.literal("")),

    confirmPassword: z.string().or(z.literal("")),

    terms: z.boolean().refine((value) => value === true, {
      message: `validation.termsRequired`,
    }),
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
