import { z } from "zod";

export const socialLinksSchema = z.object({
  socials: z.array(
    z.object({
      id: z.string().uuid(), // Переконайся, що ID - це рядок формату UUID
      link: z
        .string()
        .min(5, "Посилання занадто коротке")
        .url("Некоректне посилання"), // Валідація URL
      name: z.string().optional(),
    })
  ),
});
