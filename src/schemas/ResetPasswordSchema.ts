import { z } from "zod";

import { passwordRegex } from "./regSchema";

export const ResetPasswordSchema = z.object({
  confirmCode: z.string(),

  newPassword: z
    .string()
    .max(14, `Пароль повинен бути не більше 14 символів`)
    .regex(passwordRegex, `Введіть коректний пароль`)
    .min(8, `Пароль повинен бути не менше 8 символів`),
});
