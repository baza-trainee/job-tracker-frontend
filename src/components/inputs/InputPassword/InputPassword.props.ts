import { FieldErrors, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { RegisterSchema } from "../../form/FormExample/FormExample";

export interface InputPasswordProps {
  name: keyof z.infer<typeof RegisterSchema>;
  placeholder: string;
  className: string;
  label?: string;
  register: UseFormRegister<z.infer<typeof RegisterSchema>>;
  errors: FieldErrors;
  type: string;
  value?: string;
}