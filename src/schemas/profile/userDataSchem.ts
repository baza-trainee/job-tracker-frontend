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
          value.replace("+", "").length >= 10 &&
          value.replace("+", "").length <= 13),
      { message: "Only digits (10–13), optionally starting with +" }
    ),
});
