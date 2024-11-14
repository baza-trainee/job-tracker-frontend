import { z } from "zod";

import { emailRegex } from "./regSchema";
import { passwordRegex } from "./regSchema";

export const LogInSchema = z.object({
  email: z
    .string()
    .min(1, "Помилка")
    .max(40, `Max 40`)
    .regex(emailRegex, `Електронна пошта має містити “@”`)
    .min(4, `Min 4`)
    .trim(),

  password: z
    .string()
    .min(1, "Помилка")
    .max(50, `Пароль має містити менше 8 символів`)
    .regex(passwordRegex, `Помилка`)
    .min(8, `Пароль має містити 8 символів`),
});
