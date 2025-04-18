import { CoverLetter } from "./coverLetters.types";
import { Note } from "./notes.types";
import { Project } from "./projects.types";
import { Resume } from "./resumes.types";
import { Event } from "./event.types";
import { Vacancy } from "./vacancies.types";

export type Profile = {
  coverLetters: CoverLetter[];
  createdAt: Date;
  email: string;
  events: Event[];
  id: string;
  notes: Note[];
  projects: Project[];
  resumes: Resume[];
  username: string;
  vacancies: Vacancy[];
  // telegram: string;
  // github: string;
  // linkedin: string;
  // behance: string;
  phone: string;
  socials: { id: string; name: string; link: string }[];
};

export type ProfileKeys = keyof Profile;
