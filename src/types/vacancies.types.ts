export type WorkType = "remote" | "office" | "hybrid";

export type Vacancy = NewVacancy & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type NewVacancy = {
  vacancy: string;
  link: string;
  communication?: string;
  company: string;
  location?: string;
  work_type: WorkType;
  note?: string;
  isArchived: boolean;
  statuses?: VacancyStatus[];
};

export type VacancyStatus = NewVacancyStatus & {
  date: string;
};

export type NewVacancyStatus = {
  name: StatusName;
  rejectReason: RejectReason;
  resumeId?: string;
  statusId?: string;
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
