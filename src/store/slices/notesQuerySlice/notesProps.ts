export type Note = {
  name: string;
  text: string;
};

export type NoteWithID = Note & { id: string };
