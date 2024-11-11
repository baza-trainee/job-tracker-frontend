import { FieldErrors, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { RegisterSchema } from "../../pages/Auth/useAuth";

export interface CheckboxProps {
  name: keyof z.infer<typeof RegisterSchema>;
  className?: string;
  label?: React.ReactNode | string;
  register: UseFormRegister<z.infer<typeof RegisterSchema>>;
  errors: FieldErrors;
  type?: "default" | "signUp";
  id?: string;
  disabled?: boolean;
  required?: boolean;
}
