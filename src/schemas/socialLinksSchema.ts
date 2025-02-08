import { z } from "zod";

export const socialLinksSchema = z.object({
  socials: z.array(
    z.object({
      id: z.string().uuid(),
      link: z
        .string()
        .min(5, "Посилання занадто коротке")
        .url("Некоректне посилання"),
      name: z.string().optional(),
    })
  ),
});
