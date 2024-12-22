export type newVacancyProps = {
  vacancy: string;
  link: string;
  communication: string;
  company: string;
  location: string;
  work_type: "remote" | "office" | "mixed";
  note: string;
  isArchived?: boolean;
};
