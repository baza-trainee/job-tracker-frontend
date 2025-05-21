export type WorkType = "remote" | "office" | "hybrid";
export type RequiredFieldsProps = "company" | "vacancy" | "link" | "location";

export type Vacancy = {
  id: string;
  createdAt: string;
  updatedAt: string;
  vacancy: string;
  link: string;
  communication: string;
  company: string;
  location: string;
  work_type: WorkType;
  note: string;
  isArchived: boolean;
  statuses: VacancyStatus[];
};

export type VacancyStatus = {
  date: string;
  name: StatusName;
  rejectReason: RejectReason | null;
  resumeId: string | null;
  id: string;
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
  SOFT_SKILLS = "SOFT_SKILLS",
  TECH_SKILLS = "TECH_SKILLS",
  ENGLISH = "ENGLISH",
  EXPERIENCE = "EXPERIENCE",
  STOPPED = "STOPPED",
  NO_ANSWER = "NO_ANSWER",
  OTHER = "OTHER",
}

