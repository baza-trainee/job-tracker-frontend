import { z } from "zod";

import { nameNoteRegex, textContactUsRegex } from "./regSchema";

export const NoteSchema = z.object({
  noteName: z
    .string()
    .min(2, `contactUs.nameValidation.min`)
    .regex(nameNoteRegex, `notification.updatedUserName`)
    .max(100, `contactUs.nameValidation.max`)
    .trim()
    .or(z.literal("")),
  noteText: z
    .string()
    .min(10, `contactUs.textValidation.min`)
    .regex(textContactUsRegex, `contactUs.textValidation.text`)
    .max(4000, `contactUs.textValidation.max`)
    .trim()
    .or(z.literal("")),
  noteType: z.enum(["addNote", "updateNote"]),
});
