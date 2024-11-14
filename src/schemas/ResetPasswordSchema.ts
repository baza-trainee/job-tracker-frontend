import { z } from "zod";

import { passwordRegex } from "./regSchema";

export const ResetPasswordSchema = z.object({
  confirmCode: z.string(),

  newPassword: z
    .string()
    .min(1, "Помилка")
    .max(50, `Пароль має містити менше 8 символів`)
    .regex(passwordRegex, `Помилка`)
    .min(8, `Пароль має містити 8 символів`),
});
