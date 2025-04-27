import { z } from "zod";

export const socialLinksSchema = z.record(
  z
    .string()
    .min(4, { message: "🔢 4+" })
    .refine((value) => /\.[a-zA-Z]{2,}$/.test(value), { message: "🔗 .XX" })
);
