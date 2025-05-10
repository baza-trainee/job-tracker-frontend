import { z } from "zod";

export const userDataSchema = z.object({
  username: z.string(),
  email: z.string(),
  phone: z
    .string()
    .refine(
      (value: string) =>
        value === "" ||
        (/^\+?\d+$/.test(value) &&
          value.replace("+", "").length >= 2 &&
          value.replace("+", "").length <= 12),
      { message: "Only digits (2–11), optionally starting with +" }
    ),
});
