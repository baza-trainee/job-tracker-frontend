import { User } from "../profileQuerySlice/profileProps";

export type Resume = {
  id?: string;
  userId: string;
  name: string;
  link: string;
  user?: User;
  createdAt?: Date;
  updatedAt?: Date;
};
