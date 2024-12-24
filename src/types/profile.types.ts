import { CoverLetter } from "../store/slices/coverLettersQuerySlice/coverLettersProps";
import { Note } from "../store/slices/notesQuerySlice/notesProps";
import { Project } from "../store/slices/projectsQuerySlice/projectsProps";
import { Resume } from "../store/slices/resumesQuerySlices/resumesProps";
import { Event } from "../store/slices/eventsQuerySlice/eventProps";
import { Vacancy } from "./vacancies.types";

export type Profile = {
  coverLetters: CoverLetter[];
  createdAt: Date | string;
  email: string;
  events: Event[];
  id: string;
  notes: Note[];
  projects: Project[];
  resumes: Resume[];
  username: string;
  vacancies: Vacancy[];
};
