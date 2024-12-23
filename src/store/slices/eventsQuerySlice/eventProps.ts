import { User } from "../profileQuerySlice/profileProps";

export type Event = {
  id?: string;
  name: string;
  text: string;
  date: Date;
  time: string;
  user?: User;
  createdAt?: Date;
  updatedAt?: Date;
};
