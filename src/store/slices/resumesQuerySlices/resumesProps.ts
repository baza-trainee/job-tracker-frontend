import { User } from "../../../types/profile.types";

export type Resume = {
  id?: string;
  userId: string;
  name: string;
  link: string;
  user?: User;
  createdAt?: Date;
  updatedAt?: Date;
};
