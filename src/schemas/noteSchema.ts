import { z } from "zod";

export const NoteSchema = z.object({
  noteName: z.string().min(1, "Має містити більше одного символа"),
  noteText: z.string().min(1, "Має містити більше одного символа"),
  noteType: z.enum(["addNote", "updateNote"]),
});
