import { User } from "../profileQuerySlice/profileProps";

export type Project = {
  id?: string;
  userId: string;
  name: string;
  githubLink: string;
  liveProjectLink: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: User;
};
