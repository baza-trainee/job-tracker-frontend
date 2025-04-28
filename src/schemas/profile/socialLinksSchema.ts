import { z } from "zod";

export const socialLinksSchema = z.record(
  z
    .string()
    .min(4, { message: "abcd... 4+" })
    .refine((value) => value === "" || /\.[a-zA-Z]{2,}$/.test(value), {
      message: "🔗 .XX",
    })
);
