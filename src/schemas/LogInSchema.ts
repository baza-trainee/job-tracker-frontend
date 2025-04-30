import { z } from "zod";

export const LogInSchema = z.object({
  email: z.string().trim(),

  password: z.string().trim(),
});
