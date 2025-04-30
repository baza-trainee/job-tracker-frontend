import { z } from "zod";

export const userDataSchema = z.object({
  username: z.string(),
  email: z.string(),
  phone: z
    .string()
    .refine(
      (value: string) =>
        value === "" || (/^\d+$/.test(value) && value.length >= 2),
      { message: "Only numbers" }
    ),
});
