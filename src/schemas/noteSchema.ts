import { z } from "zod";

import { nameContactUsRegex, textContactUsRegex } from "./regSchema";

export const NoteSchema = z.object({
  noteName: z
    .string()
    .min(2, `contactUs.nameValidation.min`)
    .regex(nameContactUsRegex, `notification.updatedUserName`)
    .max(30, `contactUs.nameValidation.max`)
    .trim()
    .or(z.literal("")),
  noteText: z
    .string()
    .min(10, `contactUs.textValidation.min`)
    .regex(textContactUsRegex, `contactUs.textValidation.min`)
    .max(4000, `contactUs.textValidation.text`)
    .trim()
    .or(z.literal("")),
  noteType: z.enum(["addNote", "updateNote"]),
});
