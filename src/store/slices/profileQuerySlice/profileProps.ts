import { CoverLetter } from "../coverLettersQuerySlice/coverLettersProps";
import { Note } from "../notesQuerySlice/notesProps";
import { Prediction } from "../predictionsQuerySlice/predictionsProps";
import { Project } from "../projectsQuerySlice/projectsProps";
import { Resume } from "../resumesQuerySlices/resumesProps";
import { Vacancy } from "../vacanciesQuerySlice/vacanciesProps";
import { Event } from "../eventsQuerySlice/eventProps";

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  resetToken: string;
  resetTokenExpiry: Date;
  invalidatedTokens: string[];
  googleId: string;
  vacancies: Vacancy[];
  resumes: Resume[];
  coverLetters: CoverLetter[];
  projects: Project[];
  notes: Note[];
  events: Event[];
  predictions: Prediction[];
  createdAt: Date;
};
