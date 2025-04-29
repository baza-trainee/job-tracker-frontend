import { z } from "zod";

export const socialLinksSchema = z.record(
  z
    .string()

    .refine(
      (value) =>
        value === "" ||
        /^https?:\/\/[a-zA-Z0-9-]{2,}(\.[a-zA-Z0-9-]{2,})+(\/[^\s]*)?$/.test(
          value
        ),
      {
        message: "validation.invalidUrl",
      }
    )
);
