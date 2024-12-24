import { User } from "../../../types/profile.types";

export type Note = {
  id?: string;
  name: string;
  text: string;
  user?: User;
  createdAt?: Date;
  updatedAt?: Date;
};
