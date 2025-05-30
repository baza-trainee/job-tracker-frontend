export type Note = {
  id: string;
  name: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};

export type NoteType = {
  type: "addNote" | "updateNote";
};
