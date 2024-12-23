import { User } from "../profileQuerySlice/profileProps";

export type Note = {
  id?: string;
  name: string;
  text: string;
  user?: User;
  createdAt?: Date;
  updatedAt?: Date;
};
