import { User } from "../../../types/profile.types";

export type CoverLetter = {
  id?: string;
  name: string;
  text: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: User;
};
