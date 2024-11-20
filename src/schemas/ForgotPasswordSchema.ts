import { z } from "zod";

import { emailRegex } from "./regSchema";

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .max(254, `email повинен бути не більше 254 символів`)
    .regex(emailRegex, `Введіть коректний email`)
    .min(4, `email повинен бути не менше 4 символів`)
    .trim(),
});
