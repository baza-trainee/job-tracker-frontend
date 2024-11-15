import { z } from "zod";

import { emailRegex } from "./regSchema";

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Помилка")
    .max(40, `Max 40`)
    .regex(emailRegex, `Електронна пошта має містити “@”`)
    .min(4, `Min 4`)
    .trim(),
});
