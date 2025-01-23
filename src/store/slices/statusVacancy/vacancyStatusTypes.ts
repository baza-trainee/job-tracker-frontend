export type statusActionProps = {
  id: string;
  name: string;
  date?: string;
  rejectReason?: string | null;
  resumeId?: string | null;
};

export type vacancyStatusesProps = {
  previousStatuses: statusActionProps[];
  newStatuses: statusActionProps[];
};
