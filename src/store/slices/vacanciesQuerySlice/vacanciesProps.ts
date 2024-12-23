import { User } from "../profileQuerySlice/profileProps";

export type WorkType = "remote" | "office" | "hybrid";

export type Vacancy = {
  id?: string;
  vacancy: string;
  link: string;
  communication: string;
  company: string;
  location: string;
  work_type: WorkType;
  note: string;
  isArchived?: boolean;
  user?: User;
  statuses?: VacancyStatus[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type VacancyStatus = {
  vacancyId?: string;
  vacancy: Vacancy;
  name: StatusName;
  date: Date;
  rejectReason?: RejectReason;
  resumeId?: string;
};

export enum StatusName {
  SAVED = "saved",
  RESUME = "resume",
  HR = "hr",
  TEST = "test",
  TECH = "tech",
  REJECT = "reject",
  OFFER = "offer",
}

export enum RejectReason {
  SOFT_SKILLS = "SoftSkills",
  TECH_SKILLS = "TechSkills",
  ENGLISH = "English",
  EXPERIENCE = "experience",
  STOPPED = "stoped",
  NO_ANSWER = "no_answer",
  OTHER = "other",
}
